import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { LikesModule } from 'src/likes/likes.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tweet]),
        LikesModule
    ],
    providers: [TweetsService],
    controllers: [TweetsController]
})
export class TweetsModule {}
