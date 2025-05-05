import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Patch } from '@nestjs/common';
import { FeedbackResponseService } from './feedback-response.service';
import { CreateFeedbackResponseDto } from './dto/create-feedback-response.dto';

@Controller('feedback-responses')
export class FeedbackResponseController {
    constructor(private readonly feedbackResponseService: FeedbackResponseService) {}

    // Create a new feedback response
    @Post()
    async create(@Body() createFeedbackResponseDto: CreateFeedbackResponseDto) {
        return await this.feedbackResponseService.createResponse(createFeedbackResponseDto);
    }

    // Get all feedback responses for a specific form
    @Get('form/:formId')
    async findAllByForm(@Param('formId') formId: string) {
        return await this.feedbackResponseService.getResponsesByForm(formId);
    }
    
    @Get('response/:id')
    async findOneResponse(@Param('id') id: string) {
        return await this.feedbackResponseService.findOneResponse(id);
    }


    @Get('recent/')
    async getLastFourFeedbacks() {
        return await this.feedbackResponseService.getLastFourFeedbacks();
    }

    // Get a specific feedback response by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const response = await this.feedbackResponseService.findRelatedResponses(id);
        if (!response) {
            throw new NotFoundException('Feedback response not found');
        }
        return response;
    }

    // // Delete a feedback response by ID
    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     await this.feedbackResponseService.deleteResponse(id);
    //     return { message: 'Feedback response deleted successfully' };
    // }

    @Patch(':id/accept')
    async acceptFeedback(@Param('id') id: string) {
        return this.feedbackResponseService.acceptFeedback(id);
    }

    @Delete(':id')
    async deleteFeedback(@Param('id') id: string) {
        return this.feedbackResponseService.deleteFeedback(id);
    }
}
