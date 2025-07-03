import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

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

export class SubscribeDto{
  @IsNumber()
  @IsNotEmpty()
  packageId: number;
}

export class ChangePasswordDto{
  @IsString()
  @MinLength(8)
  oldPassword: string;
  @IsString()
  @MinLength(8)
  newPassword: string;
}