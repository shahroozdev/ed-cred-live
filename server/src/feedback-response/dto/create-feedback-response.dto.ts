import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class FeedbackDetailDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  dates?: string;

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsString()
  web?: string;
}

class FeedbackAnswerDto {
  @IsString()
  questionId: string;

  @IsOptional()
  answer: string | string[] | boolean | number;
}

export class CreateFeedbackResponseDto {
  @IsString()
  id: string;

  @IsString()
  feedbackFormId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => FeedbackDetailDto)
  details: FeedbackDetailDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackAnswerDto)
  answers: FeedbackAnswerDto[];

  @IsOptional()
  @IsString()
  comments?: string;

  @IsDateString()
  submittedAt: string;

}

