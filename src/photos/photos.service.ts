import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UsersService } from 'src/users/users.service';
import { Category } from 'src/categories/entities/category.entity';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo) private photosRepository: Repository<Photo>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
        private usersService: UsersService
    ) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByUsername(createPhotoDto.username);
    
        if (!user) {
            throw new NotFoundException("User not found");
        }
        console.log(`insertPhoto user found ${user.username}`);
    
        // Validate and get existing categories
        const categories = await this.getValidCategories(createPhotoDto.categories);
    
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;
        photo.categories = categories; // Assign valid categories to the photo
    
        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo []> {
        return this.photosRepository.find({relations: ["user", "categories"]});
    }

    private async getValidCategories(categoryNames: string[]): Promise<Category[]> {
        const validCategories: Category[] = [];
    
        for (const categoryName of categoryNames) {
            const category = await this.categoriesRepository.findOneBy({ name: categoryName });
    
            if (category) {
                validCategories.push(category);
            } else {
                // If a category is not found, you may choose to throw an error or handle it accordingly.
                throw new NotFoundException(`Category '${categoryName}' not found`);
            }
        }
    
        return validCategories;
    }

    async getPhotoById(id: number): Promise<Photo | undefined> {
        return await this.photosRepository.findOneByOrFail({id: id});
    }

    async updatePhoto(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        const photo = await this.getPhotoById(id);
    
        if (!photo) {
            throw new NotFoundException('Photo not found');
        }
    
        // Update only the provided fields in the updatePhotoDto
        Object.assign(photo, updatePhotoDto);
    
        // Handle categories update separately
        if (updatePhotoDto.categories) {
            const updatedCategories = await this.getValidCategories(updatePhotoDto.categories);
            photo.categories = updatedCategories;
        }
    
        // Save the updated photo
        return await this.photosRepository.save(photo);
    }

    async deletePhoto(id: number): Promise<void> {
        const photo = await this.getPhotoById(id);

        if (!photo) {
            throw new NotFoundException('Photo not found');
        }

        // Delete the photo
        await this.photosRepository.remove(photo);
    }
}
