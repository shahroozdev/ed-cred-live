import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackResponse } from './entities/feedback-response.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { User } from '../auth/user.entity';
import { School } from '../school/entities/school.entity';
import { Employee } from '../school/entities/employee.entity';
import { SchoolModule } from '../school/school.module';
import { Branch } from 'src/school/entities/branch.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackResponse, School, Employee, Branch, FeedbackForm, User])],
    controllers: [FeedbackResponseController],
    providers: [FeedbackResponseService],
    exports: [FeedbackResponseService],
})
export class FeedbackResponseModule {}
