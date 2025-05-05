import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

    async createPost(data: CreatePostDto): Promise<Post> {
        const post = this.postRepo.create(data);
        return this.postRepo.save(post);
    }

    async getPosts(): Promise<Partial<Post>[]> {
        return this.postRepo.find({ select: ['id', 'title', 'description', 'status', 'featured', 'image', 'createdAt'] });
    }

    async getPostsPreview(): Promise<Partial<Post>[]> {
        return this.postRepo.find({
            select: ['id', 'title', 'description', 'status', 'featured', 'image', 'createdAt'],
            order: { createdAt: 'DESC' },
            take: 3,
        });
    }

    async getPostById(id: string): Promise<Post> {
        return this.postRepo.findOne({ where: { id } });
    }

    async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
        await this.postRepo.update(id, data);
        return this.getPostById(id);
    }

    async deletePost(id: string): Promise<void> {
        await this.postRepo.delete(id);
    }
}
