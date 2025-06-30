import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormService } from './feedback-form.service';
import { FeedbackFormController } from './feedback-form.controller';
import { FeedbackForm } from './entities/feedback-form.entity';
import { User } from '../auth/user.entity';
import { Category } from '../category/category.entity';
import { FeedbackResponse } from '../feedback-response/entities/feedback-response.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Question } from '../question/entities/question.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackForm, User, Category, Subcategory, FeedbackResponse, Question])],
    controllers: [FeedbackFormController],
    providers: [FeedbackFormService],
    exports: [FeedbackFormService],
})
export class FeedbackFormModule {}
