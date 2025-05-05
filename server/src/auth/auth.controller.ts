import {
    Controller, 
    Post,
    Body,
    Get,
    Req,
    UseGuards,
    UploadedFile,
    ForbiddenException,
    UseInterceptors,
    BadRequestException,
    Query,
    NotFoundException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'types/user';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() { username, email, password }: { username: string; email: string; password: string; }) {
        return this.authService.signup(username, email, password);
    }

    @Post('login')
    async login(@Body() { identifier, password }: { identifier: string; password: string }) {
        return this.authService.login(identifier, password);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return this.authService.getProfile(req.user.id);
    }

    @Get('users')
    @UseGuards(JwtAuthGuard)
    async getUsers(@Req() req) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to view the users");
        }
        return this.authService.getUsers();
    }

    @Post('users/role')
    @UseGuards(JwtAuthGuard)
    async setUserRole(@Req() req) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to change a users role");
        }
        return this.authService.updateUserRole(req.body.userId, req.body.userRole);
    }

    @Post('users/category')
    @UseGuards(JwtAuthGuard)
    async setUserCategory(@Req() req) {
        const { categoryId } = req.body;
        return this.authService.updateUserCategory(req.user.id, categoryId);
    }

    @Post('category/update')
    @UseGuards(JwtAuthGuard)
    async updateUserCategory(@Req() req) {
        if (req.user.role !== "admin") {
            throw new ForbiddenException("You do not have permission to change a users role");
        }
        const { userId, categoryId } = req.body;
        return this.authService.updateUserCategory(userId, categoryId);
    }

    @Post('upload-verification')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: join(__dirname, '..', '..', '..', '..', 'client', 'public', 'uploads', 'verification-documents'),
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async uploadVerification(
        @UploadedFile() file: Express.Multer.File,
        @Body('userId') userId: number
    ) {
        const url = `/uploads/verification-documents/${file.filename}`;
        return this.authService.saveVerificationDocument(userId, url);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('verify-user')
    @Roles(UserRole.ADMIN)
    async verifyUser(@Body() body: { userId: number, action: "approve" | "reject" }) {
        return this.authService.handleVerification(body.userId, body.action);
    }

    @Post('send-verification-email')
    async sendVerification(@Body('email') email: string) {
        const result = await this.authService.sendVerificationEmail(email);
        if (!result) {
            throw new NotFoundException('User not found');
        }
        return { message: 'Verification email sent' };
    }

    @Get('verify-email')
    async verifyEmail(@Query('token') token: string) {
        if (!token) throw new BadRequestException('Token is required');
        const result = await this.authService.verifyEmail(token);
        if (!result) {
            throw new NotFoundException('Invalid or expired token');
        }
        return { message: 'Email verified successfully' };
    }
}
