import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "src/photos/entities/photo.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'otto.niemi@student.lab.fi', description: 'Unique username for the user' })
    username: string;

    @Column()
    @ApiProperty({ example: 'secure_password', description: 'Password of the user' })
    password: string;

    @Column()
    @ApiProperty({ example: 'Otto', description: 'First name of the user' })
    firstName: string;

    @Column()
    @ApiProperty({ example: 'Niemi', description: 'Last name of the user' })
    lastName: string;

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    @ApiProperty({ example: ['gender', ':', 'Male', 'photo', 'sideview'], description: 'Profile associated with the user' })
    profile?: Profile;

    @OneToMany(() => Photo, (photo) => photo.user)
    @ApiProperty({example: ['name: cat.jpg', 'description: picture of cat', 'url: www.imgur.com', 'user: admin', 'categories: Cats'], description: 'Photos associated with the user' })
    photos?: Photo[];
}