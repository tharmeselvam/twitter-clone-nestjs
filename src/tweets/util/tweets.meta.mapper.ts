import { Tweet } from "src/entities/tweet.entity";
import { TweetWithMetaDto } from "../dto/tweet-response.dto";

export function mapTweetsWithMeta (tweets: Tweet[]): TweetWithMetaDto[] {
    return (tweets as TweetWithMetaDto[]).map(tweet => ({
        ...tweet,
        isLiked: !!tweet.likes?.length
    }))
}