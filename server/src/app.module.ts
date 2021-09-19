import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UserOrganization } from './organizations/organizations-users.model';
import { Organization } from './organizations/organizations.model';

const configure = new ConfigService();

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: configure.get("HOST"),
      port: Number(configure.get("POSTGRES_PORT")),
      username: configure.get("POSTGRES_NAME"),
      password: configure.get("POSTGRES_PASSWORD"),
      database: configure.get("POSTGRES_DB"),
      models: [User, Organization, UserOrganization],
      autoLoadModels: true
    }),
    UsersModule,
    OrganizationsModule,
  ]
})

export class AppModule {}
