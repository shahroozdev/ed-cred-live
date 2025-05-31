import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateForumReplyDto {
  @IsString()
  @IsNotEmpty({ message: 'Reply text is required' })
  text: string;

  @IsNumber({}, { message: 'Question ID must be a number' })
  questionId: number;
}