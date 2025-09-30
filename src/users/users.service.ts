import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/log-in-user.dto';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async findByEmail (email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({email: email})
    }

    async createUser (payload: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(payload);

        return await this.usersRepository.save(user);
    }
}
