import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "./user.entity";
import { UserRole } from "./../../types/user";
// import { randomBytes } from "crypto";
import { response } from "types";
import { Subcategory } from "../subcategory/subcategory.entity";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "./dto";
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signup(
    dto: CreateUserDto
  ): Promise<response & { token?: string; user?: Partial<User> }> {
    const { password: hash, username, email } = dto;
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new ConflictException("Username already taken");
      }
      if (existingUser.email === email) {
        throw new ConflictException("Email already registered");
      }
    }

    const hashedPassword = await bcrypt.hash(hash, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: UserRole.USER, // default role is USER
      permissions: [], // no permissions allowed
    });
    const user = await this.userRepository.save(newUser);

    const token = this.jwtService.sign({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      category: newUser.category,
      subscription: newUser.subscription,
      permissions: newUser.permissions,
    });
    const { password, ...rest } = user;
    return {
      status: 200,
      message: "Sign Up Successfully.",
      token,
      user: rest,
    };
  }

  async login(
    identifier: string,
    password: string
  ): Promise<response & { token?: string; user?: User }> {
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException("Invalid credentials");

    // Sign the JWT claims
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      category: user.category,
      subscription: user.subscription,
      permissions: user.permissions,
    });

    return { status: 200, message: "Log In Successfully.", token, user };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: [
        "id",
        "username",
        "email",
        "category",
        "role",
        // 'permissions',
        "subscription",
        "isVerified",
        "verificationDocumentUrl",
        "profilePictureUrl",
      ],
      relations: ["category"],
    });

    if (!user) throw new UnauthorizedException("User not found");
    return { name: user.username, ...user };
  }

  async getUsers(
    query?: Record<string, any>
  ): Promise<response & { users: User[] }> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;

    const where: any = { role: UserRole.USER };
    if (query.categoryId) {
      where.category = { id: Number(query.categoryId) };
    }
    if (query.username) {
      where.username = { username: query.username };
    }
    if (query.status) {
      where.isVerified = { isVerified: query.status };
    }
    const [users, total] = await this.userRepository.findAndCount({
      where,
      select: [
        "id",
        "username",
        "email",
        "category",
        "role",
        "isVerified",
        "subscription",
        "createdAt",
        "verificationDocumentUrl",
        "profilePictureUrl",
      ],
      relations: ["category"],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      status: 200,
      message: "All Feedbacks List.",
      users,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }

  async updateUserRole(
    id: number,
    role: UserRole
  ): Promise<response & { user: User }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await this.userRepository.update(id, { role });
    return { status: 200, message: `User role is Updated as ${role}`, user };
  }

  async updateUserCategory(
    userId: number,
    categoryId: number
  ): Promise<response & { user: Partial<User> }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const category = await this.subcategoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    user.category = category;
    const updatedUser = await this.userRepository.save(user);
    const { password, ...rest } = updatedUser;
    return {
      status: 200,
      message: `User Category is Updated as ${category?.name}`,
      user: rest,
    };
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ["id", "username", "email"],
    });
    if (!user) throw new UnauthorizedException("User not found");
    return user;
  }

  async saveVerificationDocument(userId: number, url: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    user.verificationDocumentUrl = url;
    await this.userRepository.save(user);
    return {
      message:
        "Your docuemnt has been uploaded. You will be notified when it will be approved",
    };
  }

  async handleVerification(
    userId: number,
    action: "approve" | "reject"
  ): Promise<response> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    if (action === "approve") {
      user.isVerified = true;
    } else if (action === "reject") {
      user.verificationDocumentUrl = null;
    }

    await this.userRepository.save(user);

    return { status: 200, message: "User Status Updated." };
  }

  async sendVerificationEmail(email: string): Promise<response> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const token = randomBytes(32).toString("hex");
    user.emailVerificationToken = token;
    await this.userRepository.save(user);

    await this.mailService.sendUserConfirmation(user);
    // TODO: Make this editable by the admin user

    return { status: 200, message: "Verification Email Sent Successfully." };
  }

  async verifyEmail(token: string): Promise<response> {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: token },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isVerified = true;
    user.emailVerificationToken = null;
    await this.userRepository.save(user);
    return { status: 200, message: "Email is verified successfuly." };
  }

  async updateProfile(
    id: number,
    updateProfileDto?: any,
    file?: string
  ): Promise<response> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const updatedData: Partial<User> = {};

    // ✅ Merge DTO fields if present
    if (updateProfileDto?.username)
      updatedData.username = updateProfileDto.username;
    if (updateProfileDto?.email) updatedData.email = updateProfileDto.email;

    // ✅ Add file URL if present
    if (file) updatedData.profilePictureUrl = file;

    // ✅ Only update if something is changing
    if (Object.keys(updatedData).length === 0) {
      throw new BadRequestException("Nothing to update");
    }

    await this.userRepository.update(id, updatedData);
    return { status: 200, message: "Profile data is updated successfully." };
  }
}
