import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/log-in-user.dto';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { FollowsService } from 'src/follows/follows.service';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private userProfilesService: UserProfilesService,
        private followsService: FollowsService
    ){}

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({email: email})
    }

    async createUser(payload: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(payload);
        const savedUser = await this.usersRepository.save(user);

        await this.userProfilesService.createUserProfile(savedUser.id, payload.name);
        
        return savedUser;
    }

    async toggleFollow(followerUserId: number, followingUserId: number){
        return await this.followsService.toggleFollow(followerUserId, followingUserId);
    }

    async searchUsers(search: string, page: number, limit = 20) {
        const query = `%${search}%`;

        const [data, total] = await this.usersRepository
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['u.id', 'u.username', 'p.name', 'p.bio'])
            .where('LOWER(u.username) LIKE LOWER(:query)', {query})
            .take(limit)
            .skip((page - 1)*limit)
            .getManyAndCount();

        return { page, limit, total, data };
    }
}
