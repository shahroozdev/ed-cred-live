import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackResponse } from './entities/feedback-response.entity';
import { FeedbackForm } from '../feedback-form/entities/feedback-form.entity';
import { User } from '../auth/user.entity';
import { School } from '../school/entities/school.entity';
import { Employee } from '../school/entities/employee.entity';
import { Branch } from '../school/entities/branch.entity';
import { Category } from '../category/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackResponse, School, Employee, Branch, FeedbackForm, User, Category])],
    controllers: [FeedbackResponseController],
    providers: [FeedbackResponseService],
    exports: [FeedbackResponseService],
})
export class FeedbackResponseModule {}
