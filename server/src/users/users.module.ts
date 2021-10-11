import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserOrganization } from 'src/organizations/organizations-users.model';
import { Organization } from 'src/organizations/organizations.model';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Organization, UserOrganization]),
    forwardRef(() => OrganizationsModule),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
