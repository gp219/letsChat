/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Module({
    imports: [
      ],
      providers: [RedisService],
      controllers: [],
      exports: [RedisService],
})
export class CommonModule {}
