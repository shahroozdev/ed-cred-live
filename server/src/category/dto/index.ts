import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';


export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  id?: number;

  @IsEnum(["active", "draft"])
  @IsOptional()
  status?: "active" | "draft";

  @IsString()
  @IsOptional()
  iconUrl?: string;

  @IsString()
  color: string;
}