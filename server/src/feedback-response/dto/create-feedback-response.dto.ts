import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class FeedbackDetailDto {
  @IsOptional()
  @IsString()
  schoolName?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  reportingPeriod?: string;

  @IsOptional()
  @IsString()
  revieweeName?: string;

  @IsOptional()
  @IsString()
  divison?: string;
}

class FeedbackAnswerDto {
  @IsString()
  questionId: string;

  @IsString()
  question: string;

  @IsOptional()
  answer: string | string[] | boolean | number;
}

export class CreateFeedbackResponseDto {
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

  @IsBoolean()
  agreeTerms: boolean;
  
  @IsArray()
  @IsOptional()
  attachments?: any[];
}
