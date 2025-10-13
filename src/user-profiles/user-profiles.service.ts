import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/entities/user-profile.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfilesService {
    constructor (
        @InjectRepository(UserProfile)
        private userProfilesRepository: Repository<UserProfile>
    ){}

    async createUserProfile (userId: number, name: string): Promise<UserProfile> {
        const userProfile = await this.userProfilesRepository.create({
            user: { id: userId},
            name: name
        });

        return await this.userProfilesRepository.save(userProfile);
    }
}
