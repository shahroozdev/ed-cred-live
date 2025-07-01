import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { Post as PostEntity } from "./entities/post.entity";
import { JwtAuthGuard } from "./../auth/jwt-auth.guard";
import { UploadFile } from "../decorators/upload-file-decorator";
import { apiWrapper } from "../decorators/globalErrorHandlerClass";
import { response } from "../types";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UploadFile("image", { folder: "posts-images" })
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreatePostDto
  ): Promise<response> {
    const url = file ? `/uploads/posts-images/${file?.filename}` : null;
    return await apiWrapper(() => this.postService.createPost(data, url));
  }

  @Get()
  async getPosts(
    @Query() query?: Record<string, any>
  ): Promise<response & { posts?: Partial<PostEntity>[] }> {
    return await apiWrapper(() => this.postService.getPosts(query));
  }

  @Get("/preview/")
  async getPostsPreview(@Req() req): Promise<Partial<PostEntity>[]> {
    return this.postService.getPostsPreview();
  }

  @Get(":id")
  getPostById(@Param("id") id: string): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }

  @Put(":id")
  @UploadFile("image", { folder: "posts-images" })
  updatePost(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string,
    @Body() data: UpdatePostDto
  ): Promise<response> {
    const url = file ? `/uploads/profile-images/${file?.filename}` : null;
    return this.postService.updatePost(id, data, url);
  }

  @Delete(":id")
  deletePost(@Param("id") id: string): Promise<void> {
    return this.postService.deletePost(id);
  }
}
