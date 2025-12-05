import { Request, Body, Controller, Post, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
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
        const userId = request.user.sub;
        return await this.tweetsService.createTweet(payload, userId);
    }

    @UseGuards(AuthGuard)
    @Post(':id/like')
    async toggleLikeTweet (@Param('id', ParseIntPipe) tweetId: number, @Request() request){
        const userId = request.user.sub;
        return await this.tweetsService.toggleLikeTweet(tweetId, userId);
    }

    @UseGuards(AuthGuard)
    @Post(':id/reply')
    async replyToTweet (
        @Param('id', ParseIntPipe) parentTweetId: number,
        @Body() payload: CreateTweetDto,
        @Request() request){
            const userId = request.user.sub;
            return await this.tweetsService.createTweet(payload, userId, parentTweetId);
    }

    @Get(':id/replies')
    async getTweetReplies (@Param('id', ParseIntPipe) tweetId: number){
        return await this.tweetsService.getTweetReplies(tweetId);
    }

    @UseGuards(AuthGuard)
    @Get('following')
    async getFollowingTweets (@Request() request){
        return this.tweetsService.getFollowingTweets(request.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getMyTweets (@Request() request){
        return this.tweetsService.findTweetsByUserId(request.user.sub);
    }

    @Get('user/:id')
    async getUserTweets (@Param('id', ParseIntPipe) userId: number){
        return this.tweetsService.findTweetsByUserId(userId);
    }
}
