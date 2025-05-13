import { IsString, IsEnum, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { Permission } from '../category.entity';



export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsEnum(["active", "draft"])
  @IsOptional()
  status?: "active" | "draft";

  @IsArray()
  @IsOptional()
  permissions?: Permission[];

  @IsBoolean()
  requiresVerification: boolean;

  @IsString()
  @IsOptional()
  iconUrl?: string;
}