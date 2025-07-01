import { IsString, IsEnum, IsBoolean, IsOptional } from "class-validator";

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  id?: string;

  @IsEnum(["active", "draft"])
  status: "active" | "draft";

  @IsString()
  featured: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  body: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title: string;
  
  @IsOptional()
  @IsEnum(["active", "draft"])
  status: "active" | "draft";

  @IsOptional()
  @IsString()
  featured: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  body: string;
}
