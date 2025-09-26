import { RedisModule, RedisModuleOptions } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'single',
                url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`
            })
        })
    ]
})

export class RedisClientModule {}