import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Employee } from './entities/employee.entity';
import { FeedbackResponse } from '../feedback-response/entities/feedback-response.entity';
import { FeedbackResponseModule } from '../feedback-response/feedback-response.module';
import { Branch } from './entities/branch.entity';
import { Category } from 'src/category/category.entity';

@Module({
   imports: [TypeOrmModule.forFeature([School, Employee, Branch, FeedbackResponse, Category])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
