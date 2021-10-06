import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => UsersModule)
  ],
  exports: [TokenService]
})
export class TokenModule {}
