import { UserProfileResponseDto, UserProfileWithBioResponseDto } from "src/user-profiles/dto/user-profile-response.dto";

export class UserResponseDto {
    id: number;
    username: string;
    profile: UserProfileWithBioResponseDto;
}

export class TweetResponseUserDto {
    id: number;
    username: string;
    profile: UserProfileResponseDto;
}

export class UserFullResponseDto {
    id: number;
    username;
    profile: UserProfileWithBioResponseDto;
    followerCount: number;
    followingCount: number;
}