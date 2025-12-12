import { UserProfileResponseDto } from "src/user-profiles/dto/user-profile-response.dto";

export class UserResponseDto {
    id: number;
    username: string;
    profile: UserProfileResponseDto;
}

export class TweetResponseUserDto {
    id: number;
    username: string;
    profile: Pick<UserProfileResponseDto, 'name'>
}