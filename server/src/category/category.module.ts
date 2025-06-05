import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Employee } from 'src/school/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Employee])],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
