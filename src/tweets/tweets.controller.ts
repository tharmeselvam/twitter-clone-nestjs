import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('tweets')
export class TweetsController {
    constructor (
        private tweetsService: TweetsService
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createTweet (@Body() payload: CreateTweetDto, @Request() request){
        const userId = request.payload.sub;
        return await this.tweetsService.createTweet(payload, userId);
    }

}
