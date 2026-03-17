import { Tweet } from "src/entities/tweet.entity";
import { TweetResponseUserDto } from "src/users/dto/user-response.dto";

export class TweetResponseDto {
    id: number;
    user: TweetResponseUserDto;
    replyCount: number;
    likeCount: number;
    isLiked: boolean;
    content: string;
    createdAt: Date;
}

export type TweetWithMetaDto = Tweet & {
    replyCount: number;
    likeCount: number;
    isLiked: boolean;
}