import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, ILike, Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto";
import { response } from "types";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createCategory(
    categoryData: CreateCategoryDto
  ): Promise<response & { category?: Category }> {
    // Check if category with the same name already exists
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryData.name },
    });

    if (existingCategory) {
      throw new BadRequestException(
        "Category with the same name already exists"
      );
    }
    const category = this.categoryRepository.create(categoryData);

    const newCategory = await this.categoryRepository.save(category);
    return {
      status: 200,
      message: "Category Created Successfully.",
      category: newCategory,
    };
  }

  async getAllCategories(): Promise<response & { categories?: Category[] }> {

  const [categories, count] = await this.categoryRepository.findAndCount({
    relations: ["feedbackForms"],
    order: {
      createdAt: "DESC",
    },
  });

  if (count === 0) {
    return {
      status: 404,
      message: "No categories found.",
    };
  }

  return {
    status: 200,
    message: "Categories fetched successfully.",
    categories,
  };
  }
  async getAllCategoriesWithFilters(query?: Record<string, any>): Promise<response & { categories?: Category[] }> {
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? 10;

    const where: any = {};

    // Filter by name (case-insensitive)
    if (query.name) {
      where.name = ILike(`%${query.name}%`);
    }

    // Filter by created_at date range
    if (query.from && query.to) {
      where.createdAt = Between(new Date(query.from), new Date(query.to));
    } else if (query.from) {
      where.createdAt = Between(new Date(query.from), new Date());
    }

    const [categories, total] = await this.categoryRepository.findAndCount({
      where,
      relations: ["feedbackForms"],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: "DESC",
      },
    });

    if (!categories || categories.length === 0) {
      return {
        status: 404,
        message: "No categories found.",
      };
    }

    return {
      status: 200,
      message: "All Categories List.",
      categories,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ["subCategories"],
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async removeCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
