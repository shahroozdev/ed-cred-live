import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateUserPackageDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  packageId: number;

  @IsDateString()
  expiresAt: string; // ISO format, e.g., "2025-06-30T23:59:59Z"
}
