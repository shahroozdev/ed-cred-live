import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UploadedFile,
  ForbiddenException,
  BadRequestException,
  Query,
  Param,
  Res,
  HttpStatus,
  Put,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Roles } from "../decorators/roles.decorator";
// import { RolesGuard } from "../guards/roles.guard";
import { apiWrapper } from "../decorators/globalErrorHandlerClass";
import { User } from "./user.entity";
import {
  ChangePasswordDto,
  CreateNewUserDto,
  CreateUserDto,
  LoginUserDto,
  ResetPasswordDto,
  resetPasswordEmailDto,
  SubscribeDto,
} from "./dto";
import { Response } from "express";
import { ApiConsumes } from "@nestjs/swagger";
import { UploadFile } from "../decorators/upload-file-decorator";
import { ApiCustomResponse } from "../decorators/api-decorator";
import { Public } from "../decorators/public.decorator";
import { response } from "../types";
import { UserRole } from "../types/user";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signup")
  @ApiCustomResponse("signup")
  async signup(
    @Body() dto: CreateUserDto
  ): Promise<response & { token?: string; user?: Partial<User> }> {
    return apiWrapper(() => this.authService.signup(dto));
  }
  @Public()
  @Post("login")
  @ApiCustomResponse("loginUser")
  async login(
    @Body() { identifier, password }: LoginUserDto
  ): Promise<response & { token?: string; user?: User }> {
    return apiWrapper(() => this.authService.login(identifier, password));
  }

  @Public()
  @Post("forgot-password")
  @ApiCustomResponse("forgotPassword")
  async forgotPassword(
    @Body() { email }: resetPasswordEmailDto
  ): Promise<response> {
    return apiWrapper(() => this.authService.forgotPassword(email));
  }
  @Public()
  @Post("reset-password")
  @ApiCustomResponse("resetPassword")
  async verifyPasswordResetToken(
    @Body() { token, password }: ResetPasswordDto
  ): Promise<response & { token?: string; user?: User }> {
    return apiWrapper(() =>
      this.authService.verifyPasswordResetToken(token, password)
    );
  }
  @Post("change-password")
  @ApiCustomResponse("changePasswordDoc")
  async changePassword(
    @Req() req,
    @Body() { oldPassword, newPassword }: ChangePasswordDto
  ): Promise<response & { token?: string; user?: User }> {
    return apiWrapper(() =>
      this.authService.changePassword(req.user.id, oldPassword, newPassword)
    );
  }

  @Get("profile")
  @ApiCustomResponse("getUserProfile")
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user.id);
  }

  @Get("users")
  @Roles(UserRole.ADMIN)
  @ApiCustomResponse("getUsersSwagger")
  async getUsers(@Req() req, @Query() query?: Record<string, any>) {
    return await apiWrapper(() => this.authService.getUsers(query));
  }

  @Post("users/role")
  @Roles(UserRole.ADMIN)
  @ApiCustomResponse("setUserRoleDoc")
  async setUserRole(@Req() req) {
    return this.authService.updateUserRole(req.body.userId, req.body.userRole);
  }

  @Post("users/category")
  @ApiCustomResponse("setUserCategory")
  async setUserCategory(@Req() req) {
    const { categoryId } = req.body;
    return this.authService.updateUserCategory(req.user.id, categoryId);
  }

  @Post("create-update-user")
  @Roles(UserRole.ADMIN)
  @ApiCustomResponse("createOrUpdateUserSchema")
  async createNewUser(@Body() dto: CreateNewUserDto): Promise<response> {
    return apiWrapper(() => this.authService.createOrUpdateUser(dto));
  }

  @Post("category/update")
  @Roles(UserRole.ADMIN)
  @ApiCustomResponse("updateUserCategoryDoc")
  async updateUserCategory(@Req() req) {
    const { userId, categoryId } = req.body;
    return this.authService.updateUserCategory(userId, categoryId);
  }

  @Post("upload-verification")
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

  @Post("verify-user")
  @Roles(UserRole.ADMIN)
  @ApiCustomResponse("verifyUser")
  async verifyUser(
    @Body() body: { userId: number; action: "approve" | "reject" }
  ) {
    return await apiWrapper(() =>
      this.authService.handleVerification(body.userId, body.action)
    );
  }

  @Post("send-verification-email")
  @ApiCustomResponse("sendVerificationEmailSwagger")
  async sendVerification(@Body("email") email: string) {
    return await apiWrapper(() =>
      this.authService.sendVerificationEmail(email)
    );
  }

  @Public()
  @Get("verify-email/:token")
  @ApiCustomResponse("verifyEmail")
  async verifyEmail(@Param("token") token: string, @Res() res: Response) {
    if (!token) throw new BadRequestException("Token is required");
    try {
      await apiWrapper(() => this.authService.verifyEmail(token));
      res.redirect(process.env.FRONTEND_URL + "welcome"); // Replace with your actual frontend login URL
    } catch (error) {
      // Handle errors, e.g., invalid token, user not found, etc.
      res
        .status(HttpStatus.BAD_REQUEST)
        .send("Verification failed. Please contact support.");
    }
  }

  @Put("profile")
  @ApiConsumes("multipart/form-data")
  @ApiCustomResponse("updateProfileSwagger")
  @UploadFile("file", { folder: "profile-images" })
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Body() updateProfileDto: any
  ) {
    const url = file ? `/uploads/profile-images/${file?.filename}` : null;
    return await apiWrapper(() =>
      this.authService.updateProfile(req.user.id, updateProfileDto, url)
    );
  }

  @Put("update-package")
  @ApiCustomResponse("updateUserPackage")
  async updatePackage(@Req() req, @Body() dto: SubscribeDto) {
    return await apiWrapper(() =>
      this.authService.updatePackage(req.user.id, dto.packageId)
    );
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiCustomResponse("deleteUser")
  async deleteUser(@Param("id") id: string) {
    return await apiWrapper(() => this.authService.deleteUser(+id));
  }
}
