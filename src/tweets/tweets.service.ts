import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetsService {
    constructor (
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
}
