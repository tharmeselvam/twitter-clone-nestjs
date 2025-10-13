import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LogInUserDto } from 'src/users/dto/log-in-user.dto';
import { AuthGuard, RefreshAuthGuard } from './guard/auth.guard';

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
    @Delete('log-out')
    async logOut (@Request() request){
        const userId = request.user.sub;
        return await this.authService.logOut(userId);
    }

    @UseGuards(RefreshAuthGuard)
    @Get('tokens')
    async refreshToken (@Request() request){
        const user = request.user;
        const token = request.token;
        return await this.authService.refreshToken(user, token);
    }
}
