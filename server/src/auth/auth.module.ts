import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { RedisModule } from "src/redis/redis.module";
import { UsersModule } from "src/users/users.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { AuthSerializer } from "./serialization.provider";

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
    RedisModule
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule {}