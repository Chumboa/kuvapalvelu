import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { UpdateUserWithEmbeddedProfileDto } from './dto/update-user-with-embedded-profile.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, 
        private readonly profilesService: ProfilesService) {}

    insertUser(createUserDto: CreateUserDto): Promise<User>{
        const user = new User();
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        return this.usersRepository.save(user);
    }
    async insertUserWithEmbeddedProfile(createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto): Promise<User>{
        const profile = await this.profilesService.insertProfile(
            createUserWithEmbeddedProfileDto.profile.gender,
            createUserWithEmbeddedProfileDto.profile.photo
        );

        const user = new User();
        user.username = createUserWithEmbeddedProfileDto.username;
        user.password = createUserWithEmbeddedProfileDto.password;
        user.firstName = createUserWithEmbeddedProfileDto.firstName;
        user.lastName = createUserWithEmbeddedProfileDto.lastName;
        user.profile = profile;
        console.log(`saving ${JSON.stringify(user)}`)
        return this.usersRepository.save(user);
    }
    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ["profile", "photos"]});
    }
    async findUserByUsername(username: string): Promise<User> {
        return await this.usersRepository.findOne({where: {username: username}});
    }
    async findUserById(id: string): Promise<User> {
        return await this.usersRepository.findOneBy({id: parseInt(id)});
    }

    async createAdminUser(): Promise<User> {
        const existingAdmin = await this.findUserByUsername('admin');
        
        if (existingAdmin) {
            throw new Error('Admin user already exists');
        }

        const adminDto: CreateUserWithEmbeddedProfileDto = {
            username: 'admin',  // Set the desired admin username
            password: 'admin123',  // Set the desired admin password
            firstName: 'Admin',
            lastName: 'User',
            profile: {
                gender: 'male',  // Set the desired gender
                photo: 'admin.jpg',  // Set the desired photo URL
            }
        };

        return await this.insertUserWithEmbeddedProfile(adminDto);
    }

    async deleteUser(id: string): Promise<string> {
        // Implement logic to delete the user by ID
        const user = await this.usersRepository.findOneByOrFail({id: parseInt(id)});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        console.log(`Removing ${JSON.stringify(user)}`)
        await this.usersRepository.remove(user);
        return 'User deleted succesfully';
    }

    async updateUser(id: string, updateUserDto: UpdateUserWithEmbeddedProfileDto): Promise<User> {
        // Implement logic to fetch the user by ID, update its properties, and save it
        const user = await this.usersRepository.findOneByOrFail({ id: parseInt(id) });
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        // Update user properties with values from updateUserDto
        user.username = updateUserDto.username ?? user.username;
        user.password = updateUserDto.password ?? user.password;
        user.firstName = updateUserDto.firstName ?? user.firstName;
        user.lastName = updateUserDto.lastName ?? user.lastName;
    
        // Check if profile values are provided in the request
        if (updateUserDto.profile) {
            // Call updateProfile only if profile values are provided
            const profile = await this.profilesService.updateProfile(
                id,
                updateUserDto.profile.gender,
                updateUserDto.profile.photo
            );
            // Assign the profile to the user
            user.profile = profile;
        }
    
        return await this.usersRepository.save(user);
        
    }

}
