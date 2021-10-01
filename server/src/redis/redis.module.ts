
import { Module } from "@nestjs/common";
import * as Redis from "redis";

import { REDIS } from "./redis.constans";
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({ port: 6379, host: "localhost" }),
    },
    RedisService,
  ],
  exports: [REDIS, RedisService],
})
export class RedisModule {}