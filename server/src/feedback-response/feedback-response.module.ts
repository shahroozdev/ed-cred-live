import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackResponse } from './entities/feedback-response.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { User } from 'src/auth/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackResponse, FeedbackForm, User])],
    controllers: [FeedbackResponseController],
    providers: [FeedbackResponseService],
    exports: [FeedbackResponseService],
})
export class FeedbackResponseModule {}
