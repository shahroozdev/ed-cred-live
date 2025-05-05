import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateForumQuestionDto } from './dto/create-forum-question.dto';
import { UpdateForumQuestionDto } from './dto/update-forum-question.dto';
import { ForumQuestion } from './entities/forum-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ForumQuestionService {

    // This links to our database. And we treat it like a store, but where is this
    // store defined? How does it know the schema of what we want to put in?
    // How to link the users with this? For now we can use the user uid.
    constructor(
        @InjectRepository(ForumQuestion)
        private readonly forumQuestionRepository: Repository<ForumQuestion>,
        private authService: AuthService,
    ) {}

    async create(createForumQuestionDto: CreateForumQuestionDto): Promise<ForumQuestion> {
        // Find the user from the `usersRepository` who asked the question
        // based on their id. We have the id on the client side and must 
        // be sent with every create request.
        // If the user is not found, it is handled within the `authService`.
        const user = await this.authService.findUserById(createForumQuestionDto.authorId);
        if (!createForumQuestionDto.text || !createForumQuestionDto.title) {
            console.log(createForumQuestionDto);
            throw new BadRequestException(`the question title and text can not be null!`);
        }
        const forumQuestion = this.forumQuestionRepository.create({
            text: createForumQuestionDto.text,
            title: createForumQuestionDto.title,
            author: user,
            createdAt: new Date(),
        });

        return await this.forumQuestionRepository.save(forumQuestion);
    }

    // Returns all the questions in the `repository` along with their author names.
    async findAll(): Promise<ForumQuestion[]> {
        return await this.forumQuestionRepository.find({
            relations: ['author'],
            select: {
                id: true,
                title: true,
                text: true,
                createdAt: true,
                author: {
                    username: true,
                },
            },
        });
    }

    async getQuestionById(id: number): Promise<ForumQuestion> {
        const question = await this.forumQuestionRepository.findOne({
            where: { id },
            relations: ['author', 'replies', 'replies.author'],
        });

        if (!question) {
            throw new NotFoundException(`ForumQuestion with ID ${id} not found`);
        }

        return {
            ...question,
            author: {
                username: question.author.username,
            },
            replies: question.replies.map(reply => ({
                id: reply.id,
                text: reply.text,
                createdAt: reply.createdAt,
                author: {
                    username: reply.author.username,
                },
            })),
        } as ForumQuestion;
    }

    async removeQuestion(id: number): Promise<void> {
        const result = await this.forumQuestionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`forumQuestion with ID ${id} not found`);
        }
    }

    // TODO:(@haseeb)
    update(id: number, updateForumQuestionDto: UpdateForumQuestionDto) {
        return `This action updates a #${id} forumQuestion`;
    }

}
