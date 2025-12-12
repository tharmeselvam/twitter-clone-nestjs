import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { In, Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { LikesService } from 'src/likes/likes.service';
import { FollowsService } from 'src/follows/follows.service';
import { PaginatedResult } from 'src/util/paginated-result.interface';
import { TweetResponseDto } from './dto/tweet-response.dto';

@Injectable()
export class TweetsService {
    constructor (
        private likesService: LikesService,
        private followsService: FollowsService,
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>
    ){}

    async createTweet (payload: CreateTweetDto, userId: number, parentTweetId?: number){
        const tweet =  await this.tweetsRepository.create({
            content: payload.content,
            parentTweet: parentTweetId ? { id: parentTweetId } : undefined,
            user: { id: userId }
        });

        return await this.tweetsRepository.save(tweet);
    }

    async toggleLikeTweet (tweetId: number, userId: number){
        return await this.likesService.toggleLikeTweet(tweetId, userId);
    }

    async getTweetReplies (tweetId: number): Promise<Tweet[]> {
        return await this.tweetsRepository.find({
            where: { parentTweet: { id: tweetId }},
            order: { createdAt: 'DESC' }
        });
    }

    async getFollowingTweets (userId: number, page: number, limit: number): Promise<{ tweets: Tweet[], total: number }> {
        const followedUserIds = await this.followsService.getFollowedUserIds(userId);

        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name'])
            .where('u.id IN (:...ids)', {ids: followedUserIds})
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets, total };
    }

    async findTweetsByUserId(userId: number, page: number, limit: number): Promise<{ tweets: Tweet[], total: number}> {
        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name'])
            .where('u.id = :id', {id: userId})
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets, total };
    }

    async searchTweets(search: string, page: number, limit = 20) {
        const query = `%${search}%`;

        const [data, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name'])
            .where('LOWER(t.content) LIKE LOWER(:query)', {query})
            .take(limit)
            .skip((page - 1)*limit)
            .getManyAndCount();

        return { page, limit, total, data }
    }
}
