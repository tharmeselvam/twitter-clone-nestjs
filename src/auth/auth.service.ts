import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LogInUserDto } from 'src/users/dto/log-in-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async logIn (payload: LogInUserDto){
        const user = await this.usersService.findByEmail(payload.email);
        
        if (!user) {
            throw UnauthorizedException;
        }

        const isMatch = bcrypt.compare(payload.password, user.password);

        if (!isMatch) {
            throw UnauthorizedException;
        }

        const jwtPayload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(jwtPayload, { expiresIn: '7d' });

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async signUp (payload: CreateUserDto){
        const saltOrRounds = 10;

        const passwordHash = await bcrypt.hash(payload.password, saltOrRounds);

        return await this.usersService.createUser({
            ...payload,
            password: passwordHash
        });
    }
}
