import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UserOrganization } from './organizations/organizations-users.model';
import { Organization } from './organizations/organizations.model';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';

const configure = new ConfigService();

@Module({
  controllers: [],
  providers: [Logger],
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
      models: [User, Organization, UserOrganization, Token],
      autoLoadModels: true
    }),
    UsersModule,
    OrganizationsModule,
    AuthModule,
    TokenModule
  ]
})

export class AppModule {}
