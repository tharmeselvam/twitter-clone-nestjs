import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LogInUserDto } from 'src/users/dto/log-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRedis() private readonly redis: Redis
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

        return this.generateTokens(jwtPayload);
    }

    async signUp (payload: CreateUserDto){
        const saltOrRounds = 10;

        const passwordHash = await bcrypt.hash(payload.password, saltOrRounds);

        return await this.usersService.createUser({
            ...payload,
            password: passwordHash
        });
    }

    async refreshToken (payload: any, token: string){
        const storedToken = await this.redis.get(`refresh_token:${payload.sub}`);

        if (!storedToken){
            throw new UnauthorizedException();
        }

        if (storedToken !== token){
            throw new UnauthorizedException();
        }

        const jwtPayload = { sub: payload.sub, email: payload.email };
        return this.generateTokens(jwtPayload);
    }

    async logOut (payload: any){
        const userId = payload.sub;
        const result = await this.redis.del(`refresh_token:${userId}`);
        console.log(result);
    }

    private generateTokens(jwtPayload: { sub: number, email: string }){
        const accessToken = this.jwtService.sign(jwtPayload, {
            expiresIn: '15m',
            audience: 'api',
            issuer: 'twitter-clone-nestjs'
        });
        const refreshToken = this.jwtService.sign(jwtPayload, {
            expiresIn: '7d',
            audience: 'auth',
            issuer: 'twitter-clone-nestjs'
        });

        this.storeRefreshToken(jwtPayload.sub, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    private async storeRefreshToken (userId: number, token: string){
        await this.redis.set(
            `refresh_token:${userId}`,
            token,
            'EX',
            60 * 60 * 24 * 7
        );
    }
}
