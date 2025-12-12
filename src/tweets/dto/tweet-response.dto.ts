import { TweetResponseUserDto, UserResponseDto } from "src/users/dto/user-response.dto";

export class TweetResponseDto {
    id: number;
    user: TweetResponseUserDto;
    content: string;
    createdAt: Date;
}