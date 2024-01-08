import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Unique identifier for the profile' })
    id: number;

    @Column()
    @ApiProperty({ example: 'Male', description: 'Gender of the user' })
    gender: string;

    @Column()
    @ApiProperty({ example: 'avatar.jpg', description: 'Profile picture name' })
    photo: string;

    @OneToOne(() => User, user => user.profile)
    @ApiProperty({ type: () => User, description: 'User associated with the profile' })
    user: User
}