import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { tweetsMapper } from 'src/tweets/util/tweets.mapper';
import { PaginatedResult } from 'src/util/paginated-result.interface';
import { TweetResponseDto } from 'src/tweets/dto/tweet-response.dto';

@Controller('search')
export class SearchController {
    constructor(
        private searchService: SearchService
    ){}

    @UseGuards(AuthGuard)
    @Get('users')
    async searchUsers(
        @Query('search') search: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return await this.searchService.searchUsers(search, page);
    }

    @UseGuards(AuthGuard)
    @Get('tweets')
    async searchTweets(
        @Query('key') key: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
    ): Promise<PaginatedResult<TweetResponseDto>> {
        const { tweets, total } = await this.searchService.searchTweets(key, page, limit);
        const data = tweets.map(tweetsMapper);

        return { page, limit, total, data };
    }
}
