/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisOptions } from 'ioredis';
const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT), // Ensure port is a number
  };


@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    
    this.client = new Redis(redisConfig);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}

