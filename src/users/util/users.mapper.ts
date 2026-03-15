import { User } from "src/entities/user.entity";
import { UserResponseDto } from "../dto/user-response.dto";

export function usersMapper(user: User): UserResponseDto{
    return {
        id: user.id,
        username: user.username,
        profile: {
            name: user.profile.name,
            bio: user.profile.bio,
            profileImageUri: user.profile.profileImageUri
        }
    }
}