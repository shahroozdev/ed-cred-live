import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class SubcategoryService {
    constructor(
        @InjectRepository(Subcategory)
        private readonly subcategoryRepository: Repository<Subcategory>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async createSubcategory(name: string, status: "active" | "draft", categoryId: number): Promise<Subcategory> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);

        const subcategory = this.subcategoryRepository.create({
            name,
            status,
            createdAt: new Date(),
            parentCategory: category,
        });

        return await this.subcategoryRepository.save(subcategory);
    }

    async getAllSubcategories(): Promise<Subcategory[]> {
        return await this.subcategoryRepository.find({ relations: ['parentCategory'] });
    }

    async getSubcategoryById(id: number): Promise<Subcategory> {
        const subcategory = await this.subcategoryRepository.findOne({ where: { id }, relations: ['parentCategory'] });
        if (!subcategory) throw new NotFoundException(`Subcategory with ID ${id} not found`);
        return subcategory;
    }

    async removeSubcategory(id: number): Promise<void> {
        const result = await this.subcategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Subcategory with ID ${id} not found`);
        }
    }
}
