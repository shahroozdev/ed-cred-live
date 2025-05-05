import { Module } from '@nestjs/common';
import { ForumQuestionService } from './forum-question.service';
import { ForumQuestionController } from './forum-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumQuestion } from './entities/forum-question.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ForumQuestion]),
        AuthModule
    ],
    exports: [ForumQuestionService, TypeOrmModule],
    controllers: [ForumQuestionController],
    providers: [ForumQuestionService],
})
export class ForumQuestionModule {}
