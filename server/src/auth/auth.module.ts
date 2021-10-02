import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const configure = new ConfigService();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: configure.get("PRIVATE_SECRET"),
      signOptions: {
        expiresIn: configure.get("EXPIRE_TOKEN_TIME")
      }
    })
  ]
})
export class AuthModule {}
