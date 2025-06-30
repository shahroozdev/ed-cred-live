import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './subcategory.entity';
import { response } from '../types';
import { apiWrapper } from '../decorators/globalErrorHandlerClass';
import { CreateItemDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiCustomResponse } from '../decorators/api-decorator';

@Controller('subcategory')
export class SubcategoryController {
    constructor(private readonly categoryService: SubcategoryService) {}

    @Post()
    // @UseGuards(JwtAuthGuard)
    @ApiCustomResponse("createCategory")
    async createCategory(@Body() data:CreateItemDto): Promise<response & { subcategory?: Subcategory }> {
        return await apiWrapper(() =>this.categoryService.createSubcategory(data.name, data.status));
    }

    @Get()
    async getAllCategories( @Query() query?: Record<string, any>): Promise<response & { subcategories?: Subcategory[] }> {
        return await apiWrapper(() =>this.categoryService.getAllSubcategories(query));
    }
    @Get("/with-filters")
    @UseGuards(JwtAuthGuard)
    async getAllCategoriesWithFilter( @Query() query?: Record<string, any>): Promise<response & { subcategories?: Subcategory[] }> {
        return await apiWrapper(() =>this.categoryService.getAllSubcategoriesWithFilter(query));
    }

    @Get(':id')
    async getCategoryById(@Param('id') id: number): Promise<Subcategory | null> {
        return await apiWrapper(() =>this.categoryService.getSubcategoryById(id));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async removeCategory(@Param('id') id: number): Promise<{ message: string }> {
        await this.categoryService.removeSubcategory(id);
        return { message: 'Category removed successfully' };
    }
}

