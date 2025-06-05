import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { response } from "types";

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async createPost(data: CreatePostDto, url: string): Promise<response> {
    const newData = { ...data, image: url };
    const post = this.postRepo.create(newData);
    await this.postRepo.save(post);
    return {status:200, message:"Post Created Successfully."}
  }

  async getPosts(): Promise<Partial<Post>[]> {
    return this.postRepo.find({ order: { createdAt: "DESC" } });
  }

  async getPostsPreview(): Promise<Partial<Post>[]> {
    return this.postRepo.find({
      select: [
        "id",
        "title",
        "description",
        "status",
        "featured",
        "image",
        "createdAt",
      ],
      order: { createdAt: "DESC" },
      take: 3,
    });
  }

  async getPostById(id: string): Promise<Post> {
    return this.postRepo.findOne({ where: { id } });
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    const post = await this.postRepo.findOne({ where: { id } });
    Object.assign(post, data);
    return await this.postRepo.save(post);
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepo.delete(id);
  }
}
