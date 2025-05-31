import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateForumQuestionDto } from "./dto/create-forum-question.dto";
import { UpdateForumQuestionDto } from "./dto/update-forum-question.dto";
import { ForumQuestion } from "./entities/forum-question.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "../auth/auth.service";
import { response } from "types";

@Injectable()
export class ForumQuestionService {
  // This links to our database. And we treat it like a store, but where is this
  // store defined? How does it know the schema of what we want to put in?
  // How to link the users with this? For now we can use the user uid.
  constructor(
    @InjectRepository(ForumQuestion)
    private readonly forumQuestionRepository: Repository<ForumQuestion>,
    private authService: AuthService
  ) {}

  async create(
    createForumQuestionDto: CreateForumQuestionDto,
    authorId: number,
    url: string
  ): Promise<response> {
    const user = await this.authService.findUserById(authorId);
    if (!user) {
      console.log(createForumQuestionDto);
      throw new BadRequestException(`User Not found.`);
    }
    const forumQuestion = this.forumQuestionRepository.create({
      text: createForumQuestionDto.text,
      title: createForumQuestionDto.title,
      featureImageUrl: url,
      author: user,
    });

    const forum = await this.forumQuestionRepository.save(forumQuestion);

    return { status: 200, message: "Forum Created Successfully." };
  }

  // Returns all the questions in the `repository` along with their author names.
  async findAll(
    query?: Record<string, any>
  ): Promise<response & { forums?: ForumQuestion[] }> {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const [forums, total] = await this.forumQuestionRepository.findAndCount({
      relations: ["author"],
      select: {
        id: true,
        title: true,
        text: true,
        createdAt: true,
        featureImageUrl: true,
        author: {
          username: true,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      status: 200,
      message: "All Forums List.",
      forums,
      total,
      currentPage: page,
      pageSize,
    };
  }

  async getQuestionById(id: number): Promise<ForumQuestion> {
    const question = await this.forumQuestionRepository.findOne({
      where: { id },
      relations: ["author", "replies", "replies.author"],
    });

    if (!question) {
      throw new NotFoundException(`ForumQuestion with ID ${id} not found`);
    }

    return {
      ...question,
      author: {
        username: question.author.username,
      },
      replies: question.replies.map((reply) => ({
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
