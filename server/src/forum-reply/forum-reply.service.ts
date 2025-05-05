import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForumReply } from './entities/forum-reply.entity';
import { CreateForumReplyDto } from './dto/create-forum-reply.dto';
import { AuthService } from 'src/auth/auth.service';
import { ForumQuestion } from 'src/forum-question/entities/forum-question.entity';

@Injectable()
export class ForumReplyService {
    constructor(
        @InjectRepository(ForumReply)
        private readonly forumReplyRepository: Repository<ForumReply>,

        @InjectRepository(ForumQuestion)
        private readonly forumQuestionRepository: Repository<ForumQuestion>,

        private readonly authService: AuthService,
    ) {}

    async create(createForumReplyDto: CreateForumReplyDto): Promise<ForumReply> {
        const { authorId, questionId, text } = createForumReplyDto;

        if (!text) {
            throw new BadRequestException('Reply text cannot be empty!');
        }

        const author = await this.authService.findUserById(authorId);
        const question = await this.forumQuestionRepository.findOne({ where: { id: questionId } });

        if (!question) {
            throw new NotFoundException(`ForumQuestion with id ${questionId} not found`);
        }

        const forumReply = this.forumReplyRepository.create({
            text,
            author,
            question,
            createdAt: new Date(),
        });

        return await this.forumReplyRepository.save(forumReply);
    }

    async findAll(): Promise<ForumReply[]> {
        return await this.forumReplyRepository.find({
            relations: ['author', 'question'],
            select: {
                id: true,
                text: true,
                createdAt: true,
                author: {
                    username: true,
                },
                question: {
                    id: true,
                    title: true,
                },
            },
        });
    }

    async findOne(id: number): Promise<ForumReply> {
        const reply = await this.forumReplyRepository.findOne({
            where: { id },
            relations: ['author', 'question'],
        });

        if (!reply) {
            throw new NotFoundException(`ForumReply with id ${id} not found`);
        }

        return {
            ...reply,
            author: {
                username: reply.author.username,
            },
            question: {
                id: reply.question.id,
                title: reply.question.title,
            },
        } as ForumReply;
    }

    async remove(id: number): Promise<void> {
        const result = await this.forumReplyRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`ForumReply with id ${id} not found`);
        }
    }
}
