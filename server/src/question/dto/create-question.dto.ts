import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsString()
  type: 'rating' | 'multiple_choice' | 'true_false' | 'open_ended';

  @IsArray()
  @IsOptional()
  options?: string[];

  @IsString()
  @IsOptional()
  answer?: string;
}
