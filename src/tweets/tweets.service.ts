import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { In, Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { LikesService } from 'src/likes/likes.service';
import { FollowsService } from 'src/follows/follows.service';
import { PaginatedResult } from 'src/util/paginated-result.interface';
import { TweetResponseDto } from './dto/tweet-response.dto';
import { LikeResponse } from 'src/likes/util/like-response.interface';

@Injectable()
export class TweetsService {
    constructor (
        private likesService: LikesService,
        private followsService: FollowsService,
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>
    ){}

    async createTweet(payload: CreateTweetDto, userId: number, parentTweetId?: number): Promise<Tweet> {
        const tweet =  await this.tweetsRepository.create({
            content: payload.content,
            parentTweet: parentTweetId ? { id: parentTweetId } : undefined,
            user: { id: userId }
        });

        return await this.tweetsRepository.save(tweet);
    }

    async toggleLikeTweet (tweetId: number, userId: number): Promise<LikeResponse> {
        return await this.likesService.toggleLikeTweet(tweetId, userId);
    }

    async getTweetReplies (tweetId: number, page: number, limit: number): Promise<{ tweets, total }> {
        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri'])
            .where('t.parentTweet.id = :id', {id: tweetId})
            .orderBy('t.createdAt', 'ASC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets, total };
    }

    async getFollowingTweets (userId: number, page: number, limit: number): Promise<{ tweets: Tweet[], total: number }> {
        const followedUserIds = await this.followsService.getFollowedUserIds(userId);

        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri'])
            .where('u.id IN (:...ids)', {ids: followedUserIds})
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets, total };
    }

    async findTweetsByUserId(userId: number, replies, page: number, limit: number): Promise<{ tweets: Tweet[], total: number}> {
        const query = this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri'])
            .where('u.id = :id', {id: userId});

        // Omit replies
        if (!replies) {
            query.andWhere('t.parentTweetId IS NULL');
        }

        query
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit);
            
        const [tweets, total] = await query.getManyAndCount();

        return { tweets, total };
    }

    async getLikedTweets(userId: number, page: number, limit: number): Promise<{ tweets: Tweet[], total: number }> {
        const [ tweets, total ] = await this.tweetsRepository
            .createQueryBuilder('t')
            .innerJoin('t.likes', 'l', 'l.userId = :userId', {userId})
            .innerJoinAndSelect('t.user', 'u')
            .innerJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri'])
            .addSelect('l.createdAt')
            .orderBy('l.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets, total };
    }

    async searchTweets(key: string, page: number, limit: number): Promise<{ tweets, total }> {
        const query = `%${key}%`;

        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri'])
            .where('LOWER(t.content) LIKE LOWER(:query)', {query})
            .take(limit)
            .skip((page - 1)*limit)
            .getManyAndCount();

        return { tweets, total };
    }
}
