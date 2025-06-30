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
  UploadedFiles,
  // UseInterceptors,
  // UploadedFiles,
} from "@nestjs/common";
import { FeedbackResponseService } from "./feedback-response.service";
// import { CreateFeedbackResponseDto } from "./dto/create-feedback-response.dto";
import { apiWrapper } from "../decorators/globalErrorHandlerClass";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UploadFile } from "../decorators/upload-file-decorator";
import { ApiConsumes } from "@nestjs/swagger";
import { parseNestedFormData } from "../utils/utils";
// import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("feedback-responses")
export class FeedbackResponseController {
  constructor(
    private readonly feedbackResponseService: FeedbackResponseService
  ) {}

  // Create a new feedback response
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes("multipart/form-data")
  @UploadFile("attachments", { folder: "forms-attachments", multiple: true, maxSizeInMB:10,  type : ["all"] })
  async create(
    @UploadedFiles() attachments: Array<Express.Multer.File>,
    @Req() req,
    @Body() body: any
  ) {
    req.on("error", (err) => {
      console.error("Stream error:", err); // <- Catch hidden stream errors
    });
    // Optional: Log attachment info
    console.log(attachments, req.body, "attachments");
    const urls =
      attachments?.map(
        (file) => `/uploads/forms-attachments/${file.filename}`
      ) ?? [];
    return await apiWrapper(() =>
      this.feedbackResponseService.createResponse(
        parseNestedFormData(body),
        req?.user?.id,
        urls
      )
    );
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
  async acceptFeedback(
    @Param("id") id: string,
    @Body("type") type: "accept" | "reject"
  ) {
    return this.feedbackResponseService.acceptFeedback(id, type);
  }

  @Delete(":id")
  async deleteFeedback(@Param("id") id: string) {
    return this.feedbackResponseService.deleteFeedback(id);
  }
}
