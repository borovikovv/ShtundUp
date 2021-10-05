import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("PRIVATE_SECRET"),
        signOptions: { expiresIn: config.get("EXPIRE_TOKEN_TIME") }
      })
    }),
    forwardRef(() => UsersModule)
  ],
  exports: [AuthModule, JwtModule]
})
export class AuthModule {}
