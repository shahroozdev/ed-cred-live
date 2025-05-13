import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './subcategory.entity';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { Category } from 'src/category/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports: [TypeOrmModule.forFeature([Subcategory, Category]), CategoryModule],
    providers: [SubcategoryService],
    controllers: [SubcategoryController],
})
export class SubcategoryModule {}
