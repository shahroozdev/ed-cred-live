import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Subcategory } from "../subcategory/subcategory.entity";
import { MailModule } from "../mail/mail.module";
import { Package } from "../packages/entities/package.entity";
import { UserPackage } from "../packages/entities/user.packages.entity";
import { PackagesModule } from "../packages/packages.module";
import { PackagesService } from "../packages/packages.service";
import { EntityLog } from "../feedback-response/entities/feedback-response-log.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Subcategory,
      Package,
      UserPackage,
      EntityLog,
    ]),
    PassportModule,
    MailModule,
    PackagesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_AT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, PackagesService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
