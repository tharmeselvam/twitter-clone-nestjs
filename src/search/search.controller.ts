import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

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
        @Query('search') search: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return await this.searchService.searchTweets(search, page);
    }
}
