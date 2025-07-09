import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class SubscribeDto {
  @IsNumber()
  @IsNotEmpty()
  packageId: number;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  oldPassword: string;
  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  token: string;
}
export class resetPasswordEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class CreateNewUserDto {
  @IsOptional()
  fname?: string;

  @IsOptional()
  id?: number;

  @IsOptional()
  lname?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  education?: string;

  @IsOptional()
  profession?: string;

  @IsOptional()
  bio?: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;
  
  @IsOptional()
  @MinLength(6)
  password: string;

  @IsEnum(['active', 'inactive'], {
    message: 'Status must be active or inactive',
  })
  @IsString()
  status?: string = 'active';

  @IsNotEmpty()
  categoryId: string;
}
