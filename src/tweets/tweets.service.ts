import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { LikesService } from 'src/likes/likes.service';
import { FollowsService } from 'src/follows/follows.service';
import { LikeResponse } from 'src/likes/util/like-response.interface';
import { TweetWithMetaDto } from './dto/tweet-response.dto';
import { mapTweetsWithMeta } from './util/tweets.meta.mapper';

@Injectable()
export class TweetsService {
    constructor(
        private likesService: LikesService,
        private followsService: FollowsService,
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>
    ) { }

    async createTweet(payload: CreateTweetDto, userId: number, parentTweetId?: number): Promise<Tweet> {
        const tweet = await this.tweetsRepository.create({
            content: payload.content,
            parentTweet: parentTweetId ? { id: parentTweetId } : undefined,
            user: { id: userId }
        });

        return await this.tweetsRepository.save(tweet);
    }

    async toggleLikeTweet(tweetId: number, userId: number): Promise<LikeResponse> {
        return await this.likesService.toggleLikeTweet(tweetId, userId);
    }

    async getTweetReplies(
        userId: number | undefined, tweetId: number, page: number, limit: number
    ): Promise<{ tweets: TweetWithMetaDto[], total: number }> {
        const query = this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .loadRelationCountAndMap('t.replyCount', 't.replies')
            .loadRelationCountAndMap('t.likeCount', 't.likes');

        if (userId) {
            query
                .leftJoinAndSelect(
                    't.likes',
                    'userLike',
                    'userLike.user.id = :userId', { userId }
                )
        }

        const selectFields = ['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri']
        if (userId) selectFields.push('userLike')

        query
            .select(selectFields)
            .where('t.parentTweet.id = :id', { id: tweetId })
            .orderBy('t.createdAt', 'ASC')
            .take(limit)
            .skip((page - 1) * limit);

        const [tweets, total] = await query.getManyAndCount();

        return { tweets: mapTweetsWithMeta(tweets), total };
    }

    async getFollowingTweets(userId: number, page: number, limit: number): Promise<{ tweets: TweetWithMetaDto[], total: number }> {
        const followedUserIds = await this.followsService.getFollowedUserIds(userId);

        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .loadRelationCountAndMap('t.replyCount', 't.replies')
            .loadRelationCountAndMap('t.likeCount', 't.likes')
            .leftJoinAndSelect(
                't.likes',
                'userLike',
                'userLike.user.id = :userId', { userId }
            )
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri', 'userLike'])
            .where('u.id IN (:...ids)', { ids: followedUserIds })
            .andWhere('t.parentTweetId IS NULL')
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets: mapTweetsWithMeta(tweets), total };
    }

    async findTweetsByUserId(
        currentUserId: number | undefined, userId: number, replies, page: number, limit: number
    ): Promise<{ tweets: TweetWithMetaDto[], total: number }> {
        const query = this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .loadRelationCountAndMap('t.replyCount', 't.replies')
            .loadRelationCountAndMap('t.likeCount', 't.likes')

        if (currentUserId) {
            query
                .leftJoinAndSelect(
                    't.likes',
                    'userLike',
                    'userLike.user.id = :currentUserId', { currentUserId }
                )
        }

        const selectFields = ['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri'];
        if (currentUserId) selectFields.push('userLike');

        query
            .select(selectFields)
            .where('u.id = :id', { id: userId });

        // Omit replies
        if (!replies) {
            query.andWhere('t.parentTweetId IS NULL');
        }

        query
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit);

        const [tweets, total] = await query.getManyAndCount();

        return { tweets: mapTweetsWithMeta(tweets), total };
    }

    async getLikedTweets(userId: number, page: number, limit: number): Promise<{ tweets: TweetWithMetaDto[], total: number }> {
        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .innerJoin('t.likes', 'l', 'l.userId = :userId', { userId })
            .innerJoinAndSelect('t.user', 'u')
            .innerJoinAndSelect('u.profile', 'p')
            .loadRelationCountAndMap('t.replyCount', 't.replies')
            .loadRelationCountAndMap('t.likeCount', 't.likes')
            .leftJoinAndSelect(
                't.likes',
                'userLike',
                'userLike.user.id = :userId', { userId }
            )
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri', 'userLike'])
            .addSelect('l.createdAt')
            .orderBy('l.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets: mapTweetsWithMeta(tweets), total };
    }

    async searchTweets(
        userId: number, key: string, page: number, limit: number
    ): Promise<{ tweets: TweetWithMetaDto[], total }> {
        const searchKey = `%${key}%`;

        const [tweets, total] = await this.tweetsRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.user', 'u')
            .leftJoinAndSelect('u.profile', 'p')
            .loadRelationCountAndMap('t.replyCount', 't.replies')
            .loadRelationCountAndMap('t.likeCount', 't.likes')
            .leftJoinAndSelect(
                't.likes',
                'userLike',
                'userLike.user.id = :userId', { userId }
            )
            .select(['t', 'u.id', 'u.username', 'p.name', 'p.profileImageUri', 'userLike'])
            .where('LOWER(t.content) LIKE LOWER(:query)', { query: searchKey })
            .orderBy('t.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getManyAndCount();

        return { tweets: mapTweetsWithMeta(tweets), total };
    }
}
