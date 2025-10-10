import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(3, 50)
    @IsNotEmpty()
    password: string;

    @IsString()
    @Length(3, 50)
    @IsNotEmpty()
    name: string;
}