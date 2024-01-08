import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdatePhotoDto {
    @ApiProperty({ required: false, example: 'Sunset at Paradise Beach', description: 'Photo name' })
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false,  example: 'Golden hour magic captured on the shore', description: 'Photo description' })
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false,  example: 'www.imgur.com', description: 'URL of the photo' })
    @IsOptional()
    url?: string;

    @ApiProperty({ required: false,  example: 'photographer123', description: 'Owner of the photo' })
    @IsOptional()
    username?: string;

    @ApiProperty({
        required: false, 
        example: ['Nature', 'Scenery', 'Colors'],
        description: 'An array of categories associated with the photo'
    })
    @IsOptional()
    categories?: string[];
}