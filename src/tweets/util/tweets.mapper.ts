import { TweetResponseDto, TweetWithMetaDto } from "../dto/tweet-response.dto";

export function tweetsMapper(
    tweet: TweetWithMetaDto
): TweetResponseDto {
    return {
        id: tweet.id,
        user: {
            id: tweet.user.id,
            username: tweet.user.username,
            profile: {
                name: tweet.user.profile.name,
                profileImageUri: tweet.user.profile.profileImageUri,
            }
        },
        replyCount: tweet.replyCount,
        likeCount: tweet.likeCount,
        isLiked: tweet.isLiked,
        content: tweet.content,
        createdAt: tweet.createdAt
    };
}