import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Unique identifier for the category' })
    id: number;

    @Column()
    @ApiProperty({ example: 'Nature', description: 'Name of the category' })
    name: string;

    @Column()
    @ApiProperty({ example: 'Beautiful landscapes and scenery', description: 'Description of the category' })
    description: string;

    @ManyToMany(() => Photo, (photo) => photo.categories)
    @ApiProperty({ type: () => Photo, isArray: true, description: 'Photos associated with the category' })
    photos: Photo[]
}