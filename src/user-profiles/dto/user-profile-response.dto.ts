export class UserProfileResponseDto {
    name: string;
}

export class UserProfileWithBioResponseDto extends UserProfileResponseDto {
    bio: string  | null;
}

export class UserProfileFullResponseDto extends UserProfileWithBioResponseDto {
    profileImageUri: string | null;
    headerImageUri: string | null;
}