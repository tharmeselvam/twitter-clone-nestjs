import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
    constructor (
        @InjectRepository(Like)
        private likesRepository: Repository<Like>
    ){}

    async toggleLikeTweet(tweetId: number, userId: number){
        const likedTweet = await this.likesRepository.findOne({
            where: { tweet: { id: tweetId }, user: { id: userId }}
        });

        if (likedTweet) {
            return await this.likesRepository.remove(likedTweet);
        } else {
            const likeTweet = await this.likesRepository.create({
                tweet: { id: tweetId },
                user: { id: userId }
            });

            return await this.likesRepository.save(likeTweet);
        }
    }
}
