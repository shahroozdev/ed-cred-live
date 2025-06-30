import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { response } from "../types";

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async createPost(data: CreatePostDto, url: string): Promise<response> {
    const newData = { ...data, image: url , featured:Boolean(data?.featured)};
    const post = this.postRepo.create(newData);
    await this.postRepo.save(post);
    return { status: 200, message: "Post Created Successfully." };
  }

  async getPosts(
    query?: Record<string, any>
  ): Promise<response & { posts?: Partial<Post>[] , featuredTotal?:number, activeTotal?:number}> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;

    const where: any = {};

    // Filter by name (case-insensitive)
    if (query.name) {
      where.name = ILike(`%${query.name}%`);
    }
    const [featured, featuredTotal] = await this.postRepo.findAndCount({where:{featured:true, status:'active'}})
    const [active, activeTotal] = await this.postRepo.findAndCount({where:{status:'active'}})
    const [posts, total] = await this.postRepo.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: "DESC" },
    });

    if (!posts || posts.length === 0) {
      return {
        status: 404,
        message: "No post found.",
      };
    }

    return {
      status: 200,
      message: "All Posts List.",
      posts,
      total,
      featuredTotal,
      activeTotal,
      currentPage: Number(page),
      pageSize,
    };
  }

  async getPostsPreview(): Promise<Partial<Post>[]> {
    return this.postRepo.find({
      select: [
        "id",
        "title",
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

  async updatePost(id: string, data: UpdatePostDto, url?:string): Promise<response> {
    const post = await this.postRepo.findOne({ where: { id } });
    Object.assign(post, {...data, ...(url?{image:url}:{}), featured:Boolean(data?.featured)});
    await this.postRepo.save(post);
    return {status:200, message:'Post Updated Successfully.'}
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepo.delete(id);
  }
}
