import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FeedbackFormService } from "./feedback-form.service";
import { CreateFeedbackFormDto } from "./dto/create-feedback-form.dto";
import { FeedbackForm } from "./entities/feedback-form.entity";
import { apiWrapper } from "src/decorators/globalErrorHandlerClass";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ApiCustomResponse } from "src/decorators/api-decorator";

@Controller("feedback-form")
export class FeedbackFormController {
  constructor(private readonly feedbackFormService: FeedbackFormService) {}

  @Post()
  @ApiCustomResponse("createFeedbackForm")
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req,
    @Body() createFeedbackFormDto: CreateFeedbackFormDto
  ) {
    return await apiWrapper(() =>
      this.feedbackFormService.create(createFeedbackFormDto, req.user.id)
    );
  }

  @Get()
  findAll() {
    return this.feedbackFormService.findAll();
  }

  @Get("/groups")
  findAllGroups() {
    return this.feedbackFormService.getGroupedResponsesBySchool();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.feedbackFormService.findOne(+id);
  }

  @Get("category/:categoryId")
  async getByCategory(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return this.feedbackFormService.findByCategoryId(categoryId);
  }

  @Get("category/:categoryId/subcategory/:subcategoryId")
  async getByCategoryAndSubcategory(
    @Param("categoryId", ParseIntPipe) categoryId: number,
    @Param("subcategoryId", ParseIntPipe) subcategoryId: number
  ): Promise<FeedbackForm[]> {
    return this.feedbackFormService.findByCategoryAndSubcategory(
      categoryId,
      subcategoryId
    );
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.feedbackFormService.remove(+id);
  }
}
