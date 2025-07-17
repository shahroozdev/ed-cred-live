// src/seeders/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Category } from '../category/category.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Post } from '../posts/entities/post.entity';
import { FeedbackForm } from '../feedback-form/entities/feedback-form.entity';
import { FeedbackResponse } from '../feedback-response/entities/feedback-response.entity';
import { Dispute } from '../dispute/entities/dispute.entity';
import { Package } from '../packages/entities/package.entity';
import { UserPackage } from '../packages/entities/user.packages.entity';
import { School } from '../school/entities/school.entity';
import { Employee } from '../school/entities/employee.entity';
import { Branch } from '../school/entities/branch.entity';
import { DisputeTimeline } from '../dispute/entities/dispute.timeline.entity';
import { EntityLog } from '../feedback-response/entities/feedback-response-log.entity';
import { Document } from '../documents/entities/document.entity';
import { DocumentLog } from '../documents/entities/document-log.entity';
import { SeederCommand } from './seeder.command';
import { SeederService } from './seeder.service';
import { Question } from '../question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Category,
      Subcategory,
      Post,
      FeedbackForm,
      FeedbackResponse,
      Dispute,
      Package,
      UserPackage,
      School,
      Employee,
      Branch,
      DisputeTimeline,
      EntityLog,
      Document,
      DocumentLog,
      Question
    ]),
  ],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}