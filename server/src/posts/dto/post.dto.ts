import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(['active', 'draft'])
    status: 'active' | 'draft';

    @IsBoolean()
    featured: boolean;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    body: string;
}

export class UpdatePostDto extends CreatePostDto {}
