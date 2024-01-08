import { ApiProperty } from "@nestjs/swagger";

export class CreatePhotoDto {

    @ApiProperty({ example: 'Sunset at Paradise Beach', description: 'Photo name' })
    name: string;

    @ApiProperty({ example: 'Golden hour magic captured on the shore', description: 'Photo description' })
    description: string;
    
    @ApiProperty({ example: 'www.imgur.com', description: 'URL of the photo' })
    url: string;
    
    @ApiProperty({ example: 'photographer123', description: 'Owner of the photo' })
    username: string;

    @ApiProperty({
        example: ['Nature', 'Scenery', 'Colors'],
        description: 'An array of categories associated with the photo'
    })
    categories: string[];
}