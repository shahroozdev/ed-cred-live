import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto";
import { response } from "types";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<response & {categories?:Category[]}> {
    const categories= await this.categoryRepository.find({ relations: ["feedbackForms"] });
        if (!categories || categories.length === 0) {
      return {
        status: 404,
        message: 'No categories found.',
      };
    }
    return {status:200, message:'All Categories List.', categories}
  }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id }, relations: ['subCategories'] });
        if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
        return category;
    }

  async removeCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
