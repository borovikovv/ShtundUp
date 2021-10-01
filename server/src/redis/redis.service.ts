import { Injectable, Inject } from '@nestjs/common';
import { RedisClient } from 'redis';

import { REDIS } from "../redis/redis.constans";

@Injectable()
export class RedisService {
    constructor(@Inject(REDIS) private redis: RedisClient) {}

    async get(key): Promise<any> {
        return await this.redis.get(key);
    }

    async set(key, value) {
        await this.redis.set(key, value);
    }
}
