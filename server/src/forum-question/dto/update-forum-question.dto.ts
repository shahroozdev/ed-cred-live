import { PartialType } from '@nestjs/mapped-types';
import { CreateForumQuestionDto } from './create-forum-question.dto';

export class UpdateForumQuestionDto extends PartialType(CreateForumQuestionDto) {}
