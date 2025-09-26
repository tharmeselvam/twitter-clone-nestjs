import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule} from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET
        })
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
