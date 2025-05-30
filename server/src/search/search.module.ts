import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { FeedbackResponse } from '../feedback-response/entities/feedback-response.entity';
import { FeedbackForm } from '../feedback-form/entities/feedback-form.entity';
import { Category } from '../category/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackResponse, FeedbackForm, Category])],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
