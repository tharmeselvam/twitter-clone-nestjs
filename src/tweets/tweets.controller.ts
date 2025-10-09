import { Request, Body, Controller, Post, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LikeTweetDto } from 'src/likes/dto/like-tweet.dto';

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

    @UseGuards(AuthGuard)
    @Post(':id/like')
    async toggleLikeTweet (@Param('id', ParseIntPipe) tweetId: number, @Request() request){
        const userId = request.payload.sub;
        return await this.tweetsService.toggleLikeTweet(tweetId, userId);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getMyTweets (@Request() request){
        return this.tweetsService.findTweetsByUserId(request.payload.sub);
    }

    @Get('user/:id')
    async getUserTweets (@Param('id', ParseIntPipe) userId: number){
        return this.tweetsService.findTweetsByUserId(userId);
    }
}
