import { Tweet } from "src/entities/tweet.entity";
import { TweetCreatedDto } from "../dto/tweet-created.dto";

export function tweetCreatedMapper(tweet: Tweet): TweetCreatedDto {
    return {
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt
    }
}