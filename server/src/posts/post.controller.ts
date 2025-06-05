import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, ForbiddenException, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {  Permission } from "./../../types/user";
import { UploadFile } from '../decorators/upload-file-decorator';
import { apiWrapper } from 'src/decorators/globalErrorHandlerClass';
import { response } from 'types';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
     @UploadFile("image", { folder: "posts-images" })
    async createPost(@UploadedFile() file: Express.Multer.File, @Body() data: CreatePostDto): Promise<response> {
        const url = file ? `/uploads/profile-images/${file?.filename}` : null;
        return await apiWrapper(()=>this.postService.createPost(data, url));
    }

    @Get()
    async getPosts(@Req() req): Promise<Partial<PostEntity>[]> {
        return this.postService.getPosts();
    }

    @Get("/preview/")
    async getPostsPreview(@Req() req): Promise<Partial<PostEntity>[]> {
        return this.postService.getPostsPreview();
    }

    @Get(':id')
    getPostById(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.getPostById(id);
    }

    @Put(':id')
    updatePost(@Param('id') id: string, @Body() data: UpdatePostDto): Promise<PostEntity> {
        return this.postService.updatePost(id, data);
    }

    @Delete(':id')
    deletePost(@Param('id') id: string): Promise<void> {
        return this.postService.deletePost(id);
    }
}
