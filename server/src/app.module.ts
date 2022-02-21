import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UserOrganization } from './organizations/organizations-users.model';
import { Organization } from './organizations/organizations.model';
import { AuthModule } from './auth/auth.module';
import { AdminOrganization } from './organizations/organization-admins.model';

import { config } from 'dotenv';
const configure = new ConfigService();
config();

console.log(process.env.NODE_ENV, 'process');

@Module({
  controllers: [],
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: configure.get('HOST'),
      port: Number(configure.get('POSTGRES_PORT')),
      username: configure.get('POSTGRES_NAME'),
      password: configure.get('POSTGRES_PASSWORD'),
      database: configure.get('POSTGRES_DB'),
      models: [User, Organization, UserOrganization, AdminOrganization],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    OrganizationsModule,
    AuthModule,
  ],
})
export class AppModule {}
