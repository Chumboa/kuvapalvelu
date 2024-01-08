import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @ApiPropertyOptional({example: 'Cats', description: 'Name of the category'})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({example: 'All of the cat pictures', description: 'Short description of the photo category'})
    @IsOptional()
    @IsString()
    description?: string;
}