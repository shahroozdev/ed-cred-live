import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async createCategory(@Body() data: Category): Promise<Category> {
        return this.categoryService.createCategory(data);
    }

    @Get()
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    async getCategoryById(@Param('id') id: number): Promise<Category | null> {
        return this.categoryService.getCategoryById(id);
    }

    @Delete(':id')
    async removeCategory(@Param('id') id: number): Promise<{ message: string }> {
        await this.categoryService.removeCategory(id);
        return { message: 'Category removed successfully' };
    }
}

