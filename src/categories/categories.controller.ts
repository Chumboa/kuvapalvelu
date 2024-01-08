import { Body, Controller, Post, Get, Put, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post()
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create a new Category'})
    @UseGuards(JwtAuthGuard) 
    @ApiCreatedResponse({
        description: 'Category has been succesfully created',
        type: Category
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createCategory(
        @Body() CreateCategoryDto: CreateCategoryDto
    ): Promise<Category> {
        return await this.categoriesService.insertCategory(CreateCategoryDto);
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({summary: 'Get all Categories'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard) 
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Category updated'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard) 
    async updateCategory(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<Category> {
        return await this.categoriesService.updateCategory(+id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Category deleted'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard) 
    async deleteCategory(@Param('id') id: string): Promise<string> {
        await this.categoriesService.deleteCategory(+id);
        return 'Category deleted';
    }
}
