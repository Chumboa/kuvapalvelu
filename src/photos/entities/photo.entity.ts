import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty({ example: 'cat.jpg', description: 'Photo name' })
    name: string;

    @Column()
    @ApiProperty({ example: 'A picture of cat', description: 'Photo description' })
    description: string;

    @Column()
    @ApiProperty({ example: 'www.imgur.com', description: 'URL of the photo' })
    url: string;

    // Owner of the photo
    @ManyToOne(() => User, (user) => user.photos)
    @ApiProperty({ type: () => User, description: 'Owner of the photo' })
    user: User;

    @ManyToMany(() => Category, (category) => category.photos, {cascade: true})
    @JoinTable()
    @ApiProperty({ type: () => Category, isArray: true, description: 'Categories associated with the photo' })
    categories: Category[]
}