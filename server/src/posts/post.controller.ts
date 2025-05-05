import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post as PostEntity } from './post.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {  Permission } from "./../../types/user";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() data: CreatePostDto): Promise<PostEntity> {
        return this.postService.createPost(data);
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
