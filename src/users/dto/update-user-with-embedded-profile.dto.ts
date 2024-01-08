import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Profile } from "src/profiles/entities/profile.entity";

export class UpdateUserWithEmbeddedProfileDto {
    
    @ApiPropertyOptional({ example: 'otto.niemi@student.lab.fi', description: 'Unique username for the user' })
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({ example: 'secure_password', description: 'Password of the user' })
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({ example: 'Otto', description: 'First name of the user' })
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ example: 'Niemi', description: 'Last name of the user' })
    @IsOptional()
    lastName?: string;

    @ApiPropertyOptional({ example: ['gender', ':', 'Male', 'photo', 'sideview'], description: 'Profile associated with the user' })
    @IsOptional()
    profile?: {
        gender?: string;
        photo?: string;
    };
}