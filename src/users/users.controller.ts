import { Body, Controller, Get, Post, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserWithEmbeddedProfileDto } from './dto/update-user-with-embedded-profile.dto';

@ApiTags('Users') // Optional: Group operations under a specific tag
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     console.log(`createUser: ${JSON.stringify(createUserDto)}`)
    //     return await this.usersService.insertUser(createUserDto);
    // }

    @Post('createAdmin')
    @ApiOperation({ summary: 'Create admin user (can be called only once), doesnt require authentication in this prototype.', operationId: 'createAdminUser' })
    @ApiResponse({ status: 201, description: 'Admin user created successfully', type: User })
    async createAdminUser(): Promise<User> {
        return await this.usersService.createAdminUser();
    }

    @Post()
    @ApiOperation({ summary: 'Create user with embedded profile', operationId: 'createUserWithEmbeddedProfile' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard) 
    async createUserWithEmbeddedProfile(@Body() createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto): Promise<User> {
        console.log(`createUser: ${JSON.stringify(createUserWithEmbeddedProfileDto)}`)
        return await this.usersService.insertUserWithEmbeddedProfile(createUserWithEmbeddedProfileDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users', operationId: 'getUsers' })
    @ApiResponse({ status: 200, description: 'OK'})
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async getUsers(): Promise<User[]> {
      return await this.usersService.getUsers();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user by ID', operationId: 'updateUser' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id') id: string, @Body() updateUserWithEmbeddedProfileDto: UpdateUserWithEmbeddedProfileDto): Promise<User> {
        // Implement logic to delete the user by ID
        return await this.usersService.updateUser(id, updateUserWithEmbeddedProfileDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID', operationId: 'deleteUser' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string): Promise<void> {
        // Implement logic to delete the user by ID
        await this.usersService.deleteUser(id);
    }
  }
