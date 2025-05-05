import { Module } from '@nestjs/common';
import { ForumReplyService } from './forum-reply.service';
import { ForumReplyController } from './forum-reply.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumReply } from './entities/forum-reply.entity';
import { ForumQuestionModule } from 'src/forum-question/forum-question.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ForumReply]),
        AuthModule,
        ForumQuestionModule,
    ],
    controllers: [ForumReplyController],
    providers: [ForumReplyService],
})
export class ForumReplyModule {}
