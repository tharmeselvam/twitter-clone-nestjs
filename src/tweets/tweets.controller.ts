import { Request, Body, Controller, Post, Get, UseGuards, Param, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PaginatedResult } from 'src/util/paginated-result.interface';
import { TweetResponseDto } from './dto/tweet-response.dto';
import { tweetsMapper } from './util/tweets.mapper';
import { TweetCreatedDto } from './dto/tweet-created.dto';
import { tweetCreatedMapper } from './util/tweet-created.mapper';
import { LikeResponse } from 'src/likes/util/like-response.interface';

@Controller('tweets')
export class TweetsController {
    constructor (
        private tweetsService: TweetsService
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createTweet(@Body() payload: CreateTweetDto, @Request() request): Promise<TweetCreatedDto>{
        const userId = request.user.sub;
        const tweet = await this.tweetsService.createTweet(payload, userId);

        return tweetCreatedMapper(tweet);
    }

    @UseGuards(AuthGuard)
    @Post(':id/like')
    async toggleLikeTweet (@Param('id', ParseIntPipe) tweetId: number, @Request() request): Promise<LikeResponse> {
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
    async getTweetReplies(
        @Param('id', ParseIntPipe) tweetId: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<TweetResponseDto>>{
        const { tweets, total } = await this.tweetsService.getTweetReplies(tweetId, page, limit);
        const data = tweets.map(tweetsMapper);

        return { page, limit, total, data };
    }

    @UseGuards(AuthGuard)
    @Get('following')
    async getFollowingTweets(
        @Request() request,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<TweetResponseDto>>{
        const { tweets, total } = await this.tweetsService.getFollowingTweets(request.user.sub, page, limit);
        const data = tweets.map(tweetsMapper);
        
        return { page, limit, total, data };
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getMyTweets(
        @Request() request,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<TweetResponseDto>> {
        const { tweets, total } = await this.tweetsService.findTweetsByUserId(request.user.sub, page, limit);
        const data = tweets.map(tweetsMapper);

        return { page, limit, total, data };
    }

    @Get('user/:id')
    async getUserTweets(
        @Param('id', ParseIntPipe) userId: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<TweetResponseDto>>{
        const { tweets, total } = await this.tweetsService.findTweetsByUserId(userId, page, limit);
        const data = tweets.map(tweetsMapper);

        return { page, limit, total, data };
    }

    @UseGuards(AuthGuard)
    @Get('liked')
    async getLikedTweets(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Request() request
    ): Promise<PaginatedResult<TweetResponseDto>>{
        const { tweets, total } = await this.tweetsService.getLikedTweets(request.user.sub, page, limit);
        const data = tweets.map(tweetsMapper);

        return { page, limit, total, data };
    }
}
