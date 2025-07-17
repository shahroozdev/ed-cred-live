import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { User } from "./auth/user.entity";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./posts/post.module";
import { Category } from "./category/category.entity";
import { CategoryModule } from "./category/category.module";
import { ForumQuestionModule } from "./forum-question/forum-question.module";
import { ForumReplyModule } from "./forum-reply/forum-reply.module";
import { FeedbackFormModule } from "./feedback-form/feedback-form.module";
import { FeedbackResponseModule } from "./feedback-response/feedback-response.module";
import { SubcategoryModule } from "./subcategory/subcategory.module";
import { Subcategory } from "./subcategory/subcategory.entity";
import { RoleModule } from "./role/role.module";
import { SearchController } from "./search/search.controller";
import { SearchService } from "./search/search.service";
import { SearchModule } from "./search/search.module";
import { Post } from "./posts/entities/post.entity";
import { FeedbackResponse } from "./feedback-response/entities/feedback-response.entity";
import { FeedbackForm } from "./feedback-form/entities/feedback-form.entity";
import { Dispute } from "./dispute/entities/dispute.entity";
import { School } from "./school/entities/school.entity";
import { Employee } from "./school/entities/employee.entity";
import { Branch } from "./school/entities/branch.entity";
import { MailModule } from "./mail/mail.module";
import { MulterModule } from "@nestjs/platform-express";
import { QuestionModule } from "./question/question.module";
import { PackagesModule } from "./packages/packages.module";
import { Package } from "./packages/entities/package.entity";
import { UserPackage } from "./packages/entities/user.packages.entity";
import { SchoolModule } from "./school/school.module";
import { DisputeModule } from "./dispute/dispute.module";
import { DisputeTimeline } from "./dispute/entities/dispute.timeline.entity";
import { EntityLog } from "./feedback-response/entities/feedback-response-log.entity";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { DocumentsModule } from "./documents/documents.module";
import { Document } from "./documents/entities/document.entity";
import { DocumentLog } from "./documents/entities/document-log.entity";
import { RolesGuard } from "./guards/roles.guard";
import { SeederModule } from "./seeders/seeder.module";
import { CommandModule } from "nestjs-command";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Category,
      Subcategory,
      Post,
      FeedbackResponse,
      FeedbackForm,
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
    ]),
    AuthModule,
    CommandModule,
    PostModule,
    CategoryModule,
    SubcategoryModule,
    ForumQuestionModule,
    ForumReplyModule,
    FeedbackFormModule,
    FeedbackResponseModule,
    RoleModule,
    SearchModule,
    MailModule,
    MulterModule.register({
      dest: "./upload",
    }),
    QuestionModule,
    PackagesModule,
    SchoolModule,
    DisputeModule,
    DocumentsModule,
    SeederModule,
  ],
  controllers: [SearchController],
  providers: [
    SearchService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
