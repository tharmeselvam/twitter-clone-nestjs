import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService
    ){};

    @Post('sign-up')
    async signUp (@Body() payload: CreateUserDto){
        return await this.authService.signUp(payload);
    }
}
