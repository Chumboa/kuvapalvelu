import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private profilesRepository: Repository<Profile>) {}

    async insertProfile(gender: string, photo: string){
        const profile = new Profile();
        profile.gender = gender;
        profile.photo = photo;
        console.log(`saving profile: ${JSON.stringify(profile)}`)
        return await this.profilesRepository.save(profile);
    }
    async updateProfile(userId: string, gender: string, photo: string): Promise<Profile> {
        // Find the profile associated with the user ID
        const existingProfile = await this.profilesRepository.findOneByOrFail({ user: { id: parseInt(userId) } });

        // If the profile doesn't exist, you may choose to handle it according to your application logic
        if (!existingProfile) {
            throw new NotFoundException('Profile not found');
        }

        // Update profile properties
        existingProfile.gender = gender;
        existingProfile.photo = photo;

        // Save the updated profile
        return await this.profilesRepository.save(existingProfile);
    }
}
