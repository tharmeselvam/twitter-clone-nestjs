import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Tweet])],
    providers: [TweetsService],
    controllers: [TweetsController]
})
export class TweetsModule {}
