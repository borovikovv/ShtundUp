import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserOrganization } from 'src/organizations/organizations-users.model';
import { Organization } from 'src/organizations/organizations.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Organization, UserOrganization])
  ]
})
export class UsersModule {}
