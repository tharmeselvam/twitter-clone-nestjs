import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { LikesService } from 'src/likes/likes.service';
import { LikeTweetDto } from 'src/likes/dto/like-tweet.dto';

@Injectable()
export class TweetsService {
    constructor (
        private likesService: LikesService,
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>
    ){}

    async createTweet (payload: CreateTweetDto, userId: number, ){
        const tweet =  await this.tweetsRepository.create({
            content: payload.content,
            user: { id: userId }
        });

        return await this.tweetsRepository.save(tweet);
    }

    async toggleLikeTweet (tweetId: number, userId: number){
        this.likesService.toggleLikeTweet(tweetId, userId);
    }

    async findTweetsByUserId (userId: number): Promise<Tweet[]> {
        return await this.tweetsRepository.find({
            where: { user: { id: userId }},
            order: { createdAt: 'DESC' }
        });
    }
}
