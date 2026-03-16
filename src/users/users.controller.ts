import { Controller, Param, Request, ParseIntPipe, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsersService } from './users.service';
import { UserFullResponseDto } from './dto/user-response.dto';
import { userFullMapper } from './util/user.full.mapper';

@Controller('users')
export class UsersController {
    constructor (
        private usersService: UsersService
    ){}

    @UseGuards(AuthGuard)
    @Post(':id/follow')
    async toggleFollow (
        @Param('id', ParseIntPipe) followingUserId: number, 
        @Request() request
    ){
        const followerUserId = request.user.sub;

        return await this.usersService.toggleFollow(followerUserId, followingUserId);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async getOwnProfile (@Request() request): Promise<UserFullResponseDto> {
        const user = await this.usersService.getProfileByUserId(request.user.sub);
        const userResponse = userFullMapper(user);

        return userResponse;
    }

    @Get(':id')
    async getUserProfile (@Param('id', ParseIntPipe) userId): Promise<UserFullResponseDto> {
        const user = await this.usersService.getProfileByUserId(userId);
        const userResponse = userFullMapper(user);

        return userResponse;
    }
}
