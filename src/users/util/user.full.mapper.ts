import { User } from "src/entities/user.entity";
import { UserFullResponseDto } from "../dto/user-response.dto";

export function userFullMapper (
    user: User & { followerCount: number; followingCount: number }
): UserFullResponseDto {
    return {
        id: user.id,
        username: user.username,
        profile: {
            name: user.profile.name,
            bio: user.profile.bio,
            profileImageUri: user.profile.profileImageUri,
            headerImageUri: user.profile.headerImageUri,
        },
        followerCount: user.followerCount,
        followingCount: user.followingCount,
    }
}