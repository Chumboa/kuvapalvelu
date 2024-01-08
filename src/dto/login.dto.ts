import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ example: 'admin', description: 'User username' })
    username: string;
    @ApiProperty({ example: 'admin123', description: 'User password' })
    password: string;
  }