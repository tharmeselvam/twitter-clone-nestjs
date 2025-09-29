import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LogInUserDto } from 'src/users/dto/log-in-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService
    ){};

    @Post('log-in')
    async logIn (@Body() payload: LogInUserDto){
        return await this.authService.logIn(payload);
    }

    @Post('sign-up')
    async signUp (@Body() payload: CreateUserDto){
        return await this.authService.signUp(payload);
    }

    @UseGuards(AuthGuard)
    @Get('token')
    refreshToken (@Request() req){
        const payload = req.user;
        return this.authService.generateTokens({ sub: payload.sub, email: payload.email });
    }
}
