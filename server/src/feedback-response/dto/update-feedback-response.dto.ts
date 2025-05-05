import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackResponseDto } from './create-feedback-response.dto';

export class UpdateFeedbackResponseDto extends PartialType(CreateFeedbackResponseDto) {}
