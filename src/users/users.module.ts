import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { FollowsModule } from 'src/follows/follows.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserProfilesModule,
    FollowsModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
