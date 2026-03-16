export class UserProfileResponseDto {
    name: string;
    profileImageUri: string | null;
}

export class UserProfileWithBioResponseDto extends UserProfileResponseDto {
    bio: string  | null;
}

export class UserProfileFullResponseDto extends UserProfileWithBioResponseDto {
    headerImageUri: string | null;
}