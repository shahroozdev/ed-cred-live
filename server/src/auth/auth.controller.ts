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
  Param,
  Res,
  HttpStatus,
  Put,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "types/user";
import { RolesGuard } from "../guards/roles.guard";
import { apiWrapper } from "../decorators/globalErrorHandlerClass";
import { response } from "types";
import { User } from "./user.entity";
import { CreateUserDto, LoginUserDto } from "./dto";
import { Response } from "express";
import { ApiConsumes } from "@nestjs/swagger";
import { UploadFile } from "../decorators/upload-file-decorator";
import { ApiCustomResponse } from "src/decorators/api-decorator";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(
    @Body() dto: CreateUserDto
  ): Promise<response & { token?: string; user?: Partial<User> }> {
    return apiWrapper(() => this.authService.signup(dto));
  }

  @Post("login")
  async login(
    @Body() { identifier, password }: LoginUserDto
  ): Promise<response & { token?: string; user?: User }> {
    return apiWrapper(() => this.authService.login(identifier, password));
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Get("users")
  @UseGuards(JwtAuthGuard)
  async getUsers(@Req() req, @Query() query?: Record<string, any>) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException(
        "You do not have permission to view the users"
      );
    }
    return await apiWrapper(() => this.authService.getUsers(query));
  }

  @Post("users/role")
  @UseGuards(JwtAuthGuard)
  async setUserRole(@Req() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException(
        "You do not have permission to change a users role"
      );
    }
    return this.authService.updateUserRole(req.body.userId, req.body.userRole);
  }

  @Post("users/category")
  @UseGuards(JwtAuthGuard)
  async setUserCategory(@Req() req) {
    const { categoryId } = req.body;
    return this.authService.updateUserCategory(req.user.id, categoryId);
  }

  @Post("category/update")
  @UseGuards(JwtAuthGuard)
  async updateUserCategory(@Req() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException(
        "You do not have permission to change a users role"
      );
    }
    const { userId, categoryId } = req.body;
    return this.authService.updateUserCategory(userId, categoryId);
  }

  @Post("upload-verification")
  @UseGuards(JwtAuthGuard)
  @ApiConsumes("multipart/form-data")
  @ApiCustomResponse("uploadVerificationDocument")
  @UploadFile("file", { folder: "verification-documents" })
  async uploadVerification(
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    const url = file
      ? `/uploads/verification-documents/${file?.filename}`
      : null;
    return await apiWrapper(() =>
      this.authService.saveVerificationDocument(req?.user?.id, url)
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("verify-user")
  @Roles(UserRole.ADMIN)
  async verifyUser(
    @Body() body: { userId: number; action: "approve" | "reject" }
  ) {
    return await apiWrapper(() =>
      this.authService.handleVerification(body.userId, body.action)
    );
  }

  @Post("send-verification-email")
  async sendVerification(@Body("email") email: string) {
    return await apiWrapper(() =>
      this.authService.sendVerificationEmail(email)
    );
  }

  @Get("verify-email/:token")
  async verifyEmail(@Param("token") token: string, @Res() res: Response) {
    if (!token) throw new BadRequestException("Token is required");
    try {
      await apiWrapper(() => this.authService.verifyEmail(token));
      res.redirect(process.env.FRONTEND_URL + "/welcome"); // Replace with your actual frontend login URL
    } catch (error) {
      // Handle errors, e.g., invalid token, user not found, etc.
      res
        .status(HttpStatus.BAD_REQUEST)
        .send("Verification failed. Please contact support.");
    }
    // const result = await this.authService.verifyEmail(token);
    // if (!result) {
    //     throw new NotFoundException('Invalid or expired token');
    // }
    // return { message: 'Email verified successfully' };
  }

  @Put("/profile")
  @UseGuards(JwtAuthGuard)
  @UploadFile("file", { folder: "profile-images" })
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    updateProfileDto: any
  ) {
    const url = file ? `/uploads/profile-images/${file?.filename}` : null;
    return await apiWrapper(() =>
      this.authService.updateProfile(req.user.id, updateProfileDto, url)
    );
  }

  @Put("/update-package")
  @UseGuards(JwtAuthGuard)
  @ApiCustomResponse("updateUserPackage")
  async updatePackage(@Req() req, @Body("packageName") packageName: string) {
    return await apiWrapper(() =>
      this.authService.updatePackage(req.user.id, packageName)
    );
  }
}
