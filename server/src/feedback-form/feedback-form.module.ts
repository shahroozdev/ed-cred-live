import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormService } from './feedback-form.service';
import { FeedbackFormController } from './feedback-form.controller';
import { FeedbackForm } from './entities/feedback-form.entity';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackForm, User, Category, Subcategory, FeedbackResponse, Question])],
    controllers: [FeedbackFormController],
    providers: [FeedbackFormService],
    exports: [FeedbackFormService],
})
export class FeedbackFormModule {}
