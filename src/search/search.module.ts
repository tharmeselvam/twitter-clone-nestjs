import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UsersModule } from 'src/users/users.module';
import { TweetsModule } from 'src/tweets/tweets.module';

@Module({
  imports: [UsersModule, TweetsModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
