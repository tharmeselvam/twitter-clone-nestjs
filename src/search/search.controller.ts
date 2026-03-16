import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { tweetsMapper } from 'src/tweets/util/tweets.mapper';
import { PaginatedResult } from 'src/util/paginated-result.interface';
import { TweetResponseDto } from 'src/tweets/dto/tweet-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { usersMapper } from 'src/users/util/users.mapper';

@Controller('search')
export class SearchController {
    constructor(
        private searchService: SearchService
    ){}

    @UseGuards(AuthGuard)
    @Get('users')
    async searchUsers(
        @Query('key') key: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<UserResponseDto>> {
        const { users, total } = await this.searchService.searchUsers(key, page, limit);
        const data = users.map(usersMapper);

        return { page, limit, total, data };
    }

    @UseGuards(AuthGuard)
    @Get('tweets')
    async searchTweets(
        @Request() request,
        @Query('key') key: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<TweetResponseDto>> {
        const { tweets, total } = await this.searchService.searchTweets(request.user.sub, key, page, limit);
        const data = tweets.map(tweetsMapper);

        return { page, limit, total, data };
    }
}
