import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ) {}

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find();
    }

    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;
        return await this.categoriesRepository.save(category);
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoriesRepository.findOneBy({id: id});

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        category.name = updateCategoryDto.name;
        category.description = updateCategoryDto.description;
        console.log(`Updateing category ${JSON.stringify(category)}`)
        return await this.categoriesRepository.save(category);
    }

    async deleteCategory(id: number): Promise<void> {
        console.log(`Deleting category with ID ${id}`)
        const result = await this.categoriesRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}
