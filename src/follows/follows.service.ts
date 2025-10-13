import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowsService {
    constructor (
        @InjectRepository(Follow)
        private followsRepository: Repository<Follow>
    ){}

    async toggleFollow (followerUserId: number, followingUserId: number){
        const following = await this.followsRepository.findOne({
            where: { follower: { id: followerUserId }, following: { id: followingUserId }}
        });

        if (following){
            return await this.followsRepository.remove(following);
        } else {
            const followUser = await this.followsRepository.create({
                follower: { id: followerUserId },
                following: { id: followingUserId }
            });

            return await this.followsRepository.save(followUser);
        }
    }
}
