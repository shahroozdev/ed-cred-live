import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
  Req,
  UseGuards,
  Query,
} from "@nestjs/common";
import { FeedbackResponseService } from "./feedback-response.service";
import { CreateFeedbackResponseDto } from "./dto/create-feedback-response.dto";
import { apiWrapper } from "src/decorators/globalErrorHandlerClass";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { query } from "express";

@Controller("feedback-responses")
export class FeedbackResponseController {
  constructor(
    private readonly feedbackResponseService: FeedbackResponseService
  ) {}

  // Create a new feedback response
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req,
    @Body() createFeedbackResponseDto: CreateFeedbackResponseDto
  ) {
    return await apiWrapper(()=>this.feedbackResponseService.createResponse(
      createFeedbackResponseDto,
      req?.user?.id
    ));
  }

  // Get all feedback responses for a specific form
  @Get()
  async findAll(@Query() query?: Record<string, any>) {
    return await this.feedbackResponseService.getResponses(query);
  }
  @Get("form/:formId")
  async findAllByForm(@Param("formId") formId: string) {
    return await this.feedbackResponseService.getResponsesByForm(formId);
  }

  @Get("response/:id")
  async findOneResponse(@Param("id") id: string) {
    return await this.feedbackResponseService.findOneResponse(id);
  }

  @Get("/recent")
  async getLastFourFeedbacks() {
    return await apiWrapper(() =>
      this.feedbackResponseService.getLastFourFeedbacks()
    );
  }

  // Get a specific feedback response by ID
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const response =
      await this.feedbackResponseService.findRelatedResponses(id);
    if (!response) {
      throw new NotFoundException("Feedback response not found");
    }
    return response;
  }

  // // Delete a feedback response by ID
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //     await this.feedbackResponseService.deleteResponse(id);
  //     return { message: 'Feedback response deleted successfully' };
  // }

  @Patch(":id/:type")
  async acceptFeedback(@Param("id") id: string, @Param("type") type: "accept"|"reject") {
    return this.feedbackResponseService.acceptFeedback(id, type);
  }

  @Delete(":id")
  async deleteFeedback(@Param("id") id: string) {
    return this.feedbackResponseService.deleteFeedback(id);
  }
}
