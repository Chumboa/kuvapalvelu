import { ApiProperty } from "@nestjs/swagger";

export class CreateUserWithEmbeddedProfileDto {
    @ApiProperty({ example: 'otto.niemi@student.lab.fi', description: 'Unique username for the user' })
    username: string;

    @ApiProperty({ example: 'secure_password', description: 'Password of the user' })
    password: string;

    @ApiProperty({ example: 'Otto', description: 'First name of the user' })
    firstName: string;

    @ApiProperty({ example: 'Niemi', description: 'Last name of the user' })
    lastName: string;

    @ApiProperty({ example: ['gender', ':', 'Male', 'photo', 'sideview'], description: 'Profile associated with the user' })
    profile: {
        gender: string;
        photo: string;
    };
}