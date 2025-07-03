import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, ILike, Repository } from "typeorm";
import { Subcategory } from "./subcategory.entity";
import { Category } from "../category/category.entity";
import { response } from "../types";
import { CreateItemDto } from "./dto";

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createSubcategory(
    dto:CreateItemDto
  ): Promise<response & { subcategory?: Subcategory }> {
    const existingCategory = await this.subcategoryRepository.findOne({
      where: { name:dto?.name}
    });
    let savedSubcategory;
    if (dto?.id) {
      await this.subcategoryRepository.update({id:dto?.id}
          ,{...dto,
          }
      )
      savedSubcategory = await this.subcategoryRepository.findOne({where:{id:dto?.id}})
    }else{
      if (existingCategory) {
        throw new BadRequestException(
          "Category with the same name already exists"
        );
      }
      const subcategory = this.subcategoryRepository.create({
        ...dto,
      });
     savedSubcategory = await this.subcategoryRepository.save(subcategory);
    }

    return {
      status: 200,
      message: `Subcategory ${dto?.id?'updated':'created'} successfully`,
      subcategory: savedSubcategory,
    };
  }

  async getAllSubcategories(
    query?: Record<string, any>
  ): Promise<response & { subcategories?: Subcategory[] }> {

    const [subcategories, count] =
      await this.subcategoryRepository.findAndCount({
        // relations: ["parentCategory"],
        order: {
          createdAt: "DESC",
        },
      });

    if (count === 0) {
      return {
        status: 404,
        message: "No subcategories found.",
      };
    }

    return {
      status: 200,
      message: "All Subcategories List.",
      subcategories,
    };
  }
  async getAllSubcategoriesWithFilter(
    query?: Record<string, any>
  ): Promise<response & { subcategories?: Subcategory[] }> {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;

    const where: any = {};

    // Filter by name
    if (query.name) {
      where.name = ILike(`%${query.name}%`);
    }

    // Filter by created_at date range
    if (query.from && query.to) {
      where.createdAt = Between(new Date(query.from), new Date(query.to));
    } else if (query.from) {
      where.createdAt = Between(new Date(query.from), new Date());
    }

    const [subcategories, total] =
      await this.subcategoryRepository.findAndCount({
        where,
        // relations: ["parentCategory"],
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: {
          createdAt: "DESC",
        },
      });

    if (!subcategories || subcategories.length === 0) {
      return {
        status: 404,
        message: "No subcategories found.",
      };
    }

    return {
      status: 200,
      message: "All Subcategories List.",
      subcategories,
      total,
      currentPage: page,
      pageSize,
    };
  }

  async getSubcategoryById(id: number): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ["parentCategory"],
    });
    if (!subcategory)
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    return subcategory;
  }

  async removeSubcategory(id: number): Promise<void> {
    const result = await this.subcategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
  }
}
