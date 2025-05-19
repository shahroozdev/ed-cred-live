import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";

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
  id: string;

  @IsString()
  text: string;

  @IsString()
  type: "rating" | "multiple_choice" | "true_false" | "open_ended";

  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsString()
  correctAnswer?: string;
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
  @Type(() => Question)
  questions: Question[];
}
