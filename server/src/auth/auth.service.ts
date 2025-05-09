import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { UserRole } from "./../../types/user";
import { Category } from 'src/category/category.entity';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) {}

    async signup(username: string, email: string, password: string) {

        const existingUser = await this.userRepository.findOne({
            where: [{ username }, { email }] 
        });

        if (existingUser) {
            if (existingUser.username === username) {
                throw new ConflictException('Username already taken');
            }
            if (existingUser.email === email) {
                throw new ConflictException('Email already registered');
            }
        }

        if (password.length < 8) {
            throw new BadRequestException({
                message: "Weak password",
                reason: "Password must be at least 8 characters",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
            role: UserRole.USER,            // default role is USER
            permissions: [],                // no permissions allowed
        });
        await this.userRepository.save(newUser);

        const token = this.jwtService.sign({ 
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            category: newUser.category,
            subscription: newUser.subscription,
            permissions: newUser.permissions,
        });

        return { token };
    }

    async login(identifier: string, password: string) {
        const user = await this.userRepository.findOne({
            where: [{ email: identifier }, { username: identifier }],
        });

        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

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

        return { token };
    }

    async getProfile(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: [
                'id',
                'username',
                'email',
                'category',
                'role',
                // 'permissions',
                'subscription',
                'isVerified',
                'verificationDocumentUrl',
            ],
            relations: ["category"],
        });

        if (!user) throw new UnauthorizedException("User not found");
        return {name: user.username, ...user};
    }

    async getUsers() {
        const users = await this.userRepository.find({
            select: [
                'id',
                'username',
                'email',
                'category',
                'role',
                'isVerified',
                'subscription',
                'createdAt',
                'verificationDocumentUrl'
            ],
            relations: ['category'],
        });

        return users;
    }

    async updateUserRole(id: number, role: UserRole): Promise<User> {
        await this.userRepository.update(id, { role });
        return await this.userRepository.findOneOrFail({ where: { id }, select: ['id', 'username', 'role']},)
    }

    async updateUserCategory(userId: number, categoryId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        user.category = category;
        await this.userRepository.save(user);
        return user.category;
    }

    async findUserById(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'username', 'email']
        });
        if (!user) throw new UnauthorizedException("User not found");
        return user;
    }

    async saveVerificationDocument(userId: number, url: string) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");

        user.verificationDocumentUrl = url;
        await this.userRepository.save(user);
        return { message: "Your docuemnt has been uploaded. You will be notified when it will be approved" } 
    }

    async handleVerification(userId: number, action: 'approve' | 'reject') {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new Error('User not found');

        if (action === 'approve') {
            user.isVerified = true;
        } else if (action === 'reject') {
            user.verificationDocumentUrl = null;
        }

        return this.userRepository.save(user);
    }


    async sendVerificationEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) return false;

        const token = randomBytes(32).toString('hex');
        user.emailVerificationToken = token;
        await this.userRepository.save(user);

        const verifyUrl = `http://${process.env.BASE_URL}/verify?token=${token}`;

        // TODO: Make this editable by the admin user
        await this.mailerService.sendMail({
          to: user.email,
          subject: 'Verify Your Email - Ed-Cred',
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
              <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                <h2 style="color: #1e40af;">Welcome to Ed-Cred 👋</h2>
                <p style="color: #333333; font-size: 16px;">
                  Thank you for signing up! Please verify your email address to activate your account.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verifyUrl}" style="background-color: #1e40af; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                    Verify Email
                  </a>
                </div>
                <p style="color: #777777; font-size: 14px;">
                  If you didn’t request this, you can ignore this email.
                </p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;" />
                <p style="color: #999999; font-size: 12px;">
                  © ${new Date().getFullYear()} Ed-Cred. All rights reserved.
                </p>
              </div>
            </div>
          `,
        });

        return true;
    }

    async verifyEmail(token: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: { emailVerificationToken: token },
        });
        if (!user) return false;

        user.isVerified = true;
        user.emailVerificationToken = null;
        await this.userRepository.save(user);
        return true;
    }
}
