import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private searchService: SearchService
    ){}

    @Get('users')
    async searchUsers(
        @Query('search') search: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return await this.searchService.searchUsers(search, page);
    }

    @Get('tweets')
    async searchTweets(
        @Query('search') search: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return await this.searchService.searchTweets(search, page);
    }
}
