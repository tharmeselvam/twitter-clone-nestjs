import { Injectable } from '@nestjs/common';
import { TweetsService } from 'src/tweets/tweets.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SearchService {
    constructor(
        private usersService: UsersService,
        private tweetsService: TweetsService
    ){}

    async searchUsers(key: string, page: number, limit: number) {
        return await this.usersService.searchUsers(key, page, limit);
    }

    async searchTweets(userId: number, key: string, page: number, limit: number): Promise<{ tweets, total }> {
        return await this.tweetsService.searchTweets(userId, key, page, limit);
    }
}
