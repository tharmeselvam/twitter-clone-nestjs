import { Injectable } from '@nestjs/common';
import { TweetsService } from 'src/tweets/tweets.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SearchService {
    constructor(
        private usersService: UsersService,
        private tweetsService: TweetsService
    ){}

    async searchUsers(search: string, page: number) {
        return await this.usersService.searchUsers(search, page);
    }

    async searchTweets(key: string, page: number, limit: number): Promise<{ tweets, total }> {
        return await this.tweetsService.searchTweets(key, page, limit);
    }
}
