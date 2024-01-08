import { Body, Controller, Get, Param, Patch, Post, UseGuards, Delete } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new photo', operationId: 'createPhoto' })
    @ApiResponse({ status: 201, description: 'Photo created successfully', type: Photo })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post()
    @UseGuards(JwtAuthGuard)
    async createPhotoUsingEmail(
        @Body() createPhotoDto: CreatePhotoDto
    ): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Get all photos', operationId: 'getPhotos' })
    @ApiResponse({ status: 200, description: 'OK'})
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard)
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({ summary: 'Update Photo by ID', operationId: 'updatePhoto' })
    @ApiResponse({ status: 200, description: 'Photo updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @UseGuards(JwtAuthGuard)
    async updatePhoto(
        @Param('id') id: number,
        @Body() updatePhotoDto: UpdatePhotoDto,
    ): Promise<Photo> {
        return await this.photosService.updatePhoto(id, updatePhotoDto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete Photo by ID', operationId: 'deletePhoto' })
    @ApiResponse({ status: 200, description: 'Photo deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @UseGuards(JwtAuthGuard)
    async deletePhoto(@Param('id') id: number): Promise<string> {
        await this.photosService.deletePhoto(id);
        return 'Photo deleted succesfully';
    }
}

