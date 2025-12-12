import { Tweet } from "src/entities/tweet.entity";
import { TweetResponseDto } from "../dto/tweet-response.dto";

export function tweetsMapper(tweet: Tweet): TweetResponseDto {
    return {
        id: tweet.id,
        user: {
            id: tweet.user.id,
            username: tweet.user.username,
            profile: {
                name: tweet.user.profile.name
            }
        },
        content: tweet.content,
        createdAt: tweet.createdAt
    };
}