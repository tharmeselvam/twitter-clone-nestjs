import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow])
  ],
  providers: [FollowsService],
  exports: [FollowsService]
})
export class FollowsModule {}
