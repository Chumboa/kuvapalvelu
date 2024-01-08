import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: 'Birds', description: 'Name of the category'})
    @IsString()
    name: string;

    @ApiProperty({example: 'All of the bird pictures', description: 'Short description of the photo category'})
    @IsString()
    description: string;
}