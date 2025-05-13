import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './subcategory.entity';

@Controller('subcategory')
export class SubcategoryController {
    constructor(private readonly categoryService: SubcategoryService) {}

    @Post()
    async createCategory(@Body() data: { name: string; status: "active" | "draft"; categoryId: number; }): Promise<Subcategory> {
        return this.categoryService.createSubcategory(data.name, data.status, data.categoryId);
    }

    @Get()
    async getAllCategories(): Promise<Subcategory[]> {
        return this.categoryService.getAllSubcategories();
    }

    @Get(':id')
    async getCategoryById(@Param('id') id: number): Promise<Subcategory | null> {
        return this.categoryService.getSubcategoryById(id);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: number): Promise<{ message: string }> {
        await this.categoryService.removeSubcategory(id);
        return { message: 'Category removed successfully' };
    }
}

