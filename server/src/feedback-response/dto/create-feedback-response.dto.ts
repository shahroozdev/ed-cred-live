import {
  IsArray,
  IsNumber,
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
  schoolWebsite?: string;

  @IsOptional()
  @IsString()
  schoolCountry?: string;

  @IsOptional()
  @IsString()
  reportingPeriod?: string;

  // For the category principal
  @IsOptional()
  @IsString()
  pricipalName?: string;

  @IsOptional()
  @IsString()
  pricipalDivison?: string;

  // For the category director
  @IsOptional()
  @IsString()
  directorName?: string;

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
  
  @IsArray()
  @IsOptional()
  attachments?: any[];
}
