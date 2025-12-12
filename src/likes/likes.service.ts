import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/like.entity';
import { Repository } from 'typeorm';
import { LikeResponse } from './util/like-response.interface';

@Injectable()
export class LikesService {
    constructor (
        @InjectRepository(Like)
        private likesRepository: Repository<Like>
    ){}

    async toggleLikeTweet(tweetId: number, userId: number): Promise<LikeResponse> {
        const likedTweet = await this.likesRepository.findOne({
            where: { tweet: { id: tweetId }, user: { id: userId }}
        });

        if (likedTweet) {
            await this.likesRepository.remove(likedTweet);
            const likeCount = await this.getLikeCount(tweetId);

            return {
                liked: false,
                likeCount: likeCount
            }
        } else {
            const likeTweet = await this.likesRepository.create({
                tweet: { id: tweetId },
                user: { id: userId }
            });
            await this.likesRepository.save(likeTweet);
            const likeCount = await this.getLikeCount(tweetId);

            return {
                liked: true,
                likeCount: likeCount
            }
        }
    }

    async getLikeCount(tweetId: number): Promise<number> {
        const likeCount = await this.likesRepository.count({
            where: { tweet: { id: tweetId }}
        });

        return likeCount;
    }
}
