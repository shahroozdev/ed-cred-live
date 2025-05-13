import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto';
import { apiWrapper } from 'src/decorators/globalErrorHandlerClass';
import { response } from 'types';
import { ApiCustomResponse } from 'src/decorators/api-decorator';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
     @ApiCustomResponse('createCategory')
    async createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
        return apiWrapper(() => this.categoryService.createCategory(data));
    }

    @Get()
    async getAllCategories(): Promise<response & {categories?:Category[]}> {
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

