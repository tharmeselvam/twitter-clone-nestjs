import { Controller, Param, Request, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsersService } from './users.service';

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
}
