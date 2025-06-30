import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateForumQuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Text is required' })
  text: string;
  
  @IsString()
  @IsOptional()
  id?: string;

  // This will be handled by @UploadedFile(), not validated by class-validator
  @IsOptional()
  featuredImage?: Express.Multer.File;
}
