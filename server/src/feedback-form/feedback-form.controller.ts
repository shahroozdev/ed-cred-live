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
  Query,
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
  async findAll(@Query() query?: Record<string, any>) {
    return await apiWrapper(() => this.feedbackFormService.findAll(query));
  }

  @Get("/groups")
  findAllGroups() {
    return this.feedbackFormService.getGroupedResponsesBySchool();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await apiWrapper(() => this.feedbackFormService.findOne(+id));
  }

  @Get("category/:categoryId")
  async getByCategory(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return await apiWrapper(() =>
      this.feedbackFormService.findByCategoryId(categoryId)
    );
  }

  @Get("category/:categoryId/subcategory/:subcategoryId")
  async getByCategoryAndSubcategory(
    @Param("categoryId", ParseIntPipe) categoryId: number,
    @Param("subcategoryId", ParseIntPipe) subcategoryId: number
  ): Promise<FeedbackForm[]> {
    return await apiWrapper(() =>
      this.feedbackFormService.findByCategoryAndSubcategory(
        categoryId,
        subcategoryId
      )
    );
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: string) {
    return await apiWrapper(() => this.feedbackFormService.remove(+id));
  }
}
