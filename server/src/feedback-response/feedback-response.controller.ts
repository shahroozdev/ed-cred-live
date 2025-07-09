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
} from "@nestjs/common";
import { FeedbackResponseService } from "./feedback-response.service";
import { apiWrapper } from "../decorators/globalErrorHandlerClass";
import { UploadFile } from "../decorators/upload-file-decorator";
import { ApiConsumes } from "@nestjs/swagger";
import { parseNestedFormData } from "../utils/utils";
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "../types/user";
import { verifyFeedbackByAdminDto } from "./dto/create-feedback-response.dto";

@Controller("feedback-responses")
export class FeedbackResponseController {
  constructor(
    private readonly feedbackResponseService: FeedbackResponseService
  ) {}

  // Create a new feedback response
  @Post()
  // @UseGuards(JwtAuthGuard)
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

  @Patch("verifyByAdmin")
  @Roles(UserRole.ADMIN)
  async verifyFeedbackbBAdmin(
    @Body() dto: verifyFeedbackByAdminDto
  ) {
    return this.feedbackResponseService.verifyFeedback(dto);
  }

  @Patch(":id/:type")
  async acceptFeedback(
    @Param("id") id: string,
    @Param("type") type: "accept" | "reject"
  ) {
    return this.feedbackResponseService.acceptFeedback(id, type);
  }

  @Delete(":id")
  async deleteFeedback(@Param("id") id: string) {
    return this.feedbackResponseService.deleteFeedback(id);
  }
}
