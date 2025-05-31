import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  Req,
  Query,
} from "@nestjs/common";
import { ForumQuestionService } from "./forum-question.service";
import { CreateForumQuestionDto } from "./dto/create-forum-question.dto";
import { UpdateForumQuestionDto } from "./dto/update-forum-question.dto";
import { apiWrapper } from "src/decorators/globalErrorHandlerClass";
import { UploadFile } from "src/decorators/upload-file-decorator";
import { ApiConsumes } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("forum-question")
export class ForumQuestionController {
  constructor(private readonly forumQuestionService: ForumQuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes("multipart/form-data")
  @UploadFile("featuredImage", { folder: "forum-images" })
  async create(@UploadedFile() featredImage: Express.Multer.File,@Req() req, @Body() createForumQuestionDto: CreateForumQuestionDto) {
        const url = featredImage
      ? `/uploads/verification-documents/${featredImage?.filename}`
      : null;
    return await apiWrapper(() =>
      this.forumQuestionService.create(createForumQuestionDto, req.user.id, url)
    );
  }

  @Get()
  findAll(@Query() query?: Record<string, any>) {
    return this.forumQuestionService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.forumQuestionService.getQuestionById(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateForumQuestionDto: UpdateForumQuestionDto
  ) {
    return this.forumQuestionService.update(+id, updateForumQuestionDto);
  }

  @Delete(":id")
 async remove(@Param("id") id: string) {
    return await apiWrapper(() => this.forumQuestionService.removeQuestion(+id));
  }
}
