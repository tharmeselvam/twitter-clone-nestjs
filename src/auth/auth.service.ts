import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
    ){}

    async signUp (payload: CreateUserDto) {
        const saltOrRounds = 10;

        const passwordHash = await bcrypt.hash(payload.password, saltOrRounds);

        return await this.usersService.createUser({
            ...payload,
            password: passwordHash
        });
    }
}
