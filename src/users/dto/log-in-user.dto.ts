import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class LogInUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}