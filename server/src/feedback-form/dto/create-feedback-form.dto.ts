import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "../../question/dto/create-question.dto";

// Optional details toggles
export class FeedbackDetails {
  @IsBoolean()
  salary: boolean;

  @IsBoolean()
  schoolName: boolean;

  @IsBoolean()
  schoolWebsite: boolean;

  @IsBoolean()
  schoolCountry: boolean;

  @IsBoolean()
  reportingPeriod: boolean;

  @IsBoolean()
  pricipalName: boolean;

  @IsBoolean()
  pricipalDivison: boolean;

  @IsBoolean()
  directorName: boolean;
}

export class Question {
  @IsString()
  text: string;

  @IsString()
  type: "rating" | "multiple_choice" | "true_false" | "open_ended";

  @IsArray()
  @IsOptional()
  options?: any[];

  @IsString()
  @IsOptional()
  answer?: string;
}

export class CreateFeedbackFormDto {
  @IsNumber()
  categoryId: number;

  @IsNumber()
  subCategoryId: number;

  @IsString()
  title: string;

  @IsBoolean()
  isDraft: boolean;

  @ValidateNested()
  @Type(() => FeedbackDetails)
  details: FeedbackDetails;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
