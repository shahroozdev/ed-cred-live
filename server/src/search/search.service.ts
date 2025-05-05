import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';
import { Repository } from 'typeorm';
import { FeedbackForm } from "src/feedback-form/entities/feedback-form.entity";
import { Category } from 'src/category/category.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(FeedbackResponse)
    private readonly feedbackResponseRepository: Repository<FeedbackResponse>,
    @InjectRepository(FeedbackForm)
    private readonly feedbackFormRepository: Repository<FeedbackForm>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async search(query: string) {
    return await this.feedbackResponseRepository
      .createQueryBuilder("feedback_response")
      .leftJoinAndSelect("feedback_response.feedbackForm", "feedback_form")
      .leftJoinAndSelect("feedback_form.category", "category")
      .where("feedback_response.details::text ILIKE :query", { query: `%${query}%` })
      .orWhere("feedback_form.title ILIKE :query", { query: `%${query}%` })
      .getMany();
  }
}
