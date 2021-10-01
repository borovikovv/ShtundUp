import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { RedisService } from "src/redis/redis.service";

import { User } from "./dto/user.interface";

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly redisService: RedisService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: { id: number; role: string }) => void) {
    done(null, { id: user.id, role: user.role });
  }

  deserializeUser(payload: { id: number; role: string }, done: (err: Error, user) => void) {
    const user = this.redisService.get(payload.id);
    done(null, user);
  }
}