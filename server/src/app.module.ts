import { Inject, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import { session as passportSession, initialize as passportInitialize } from 'passport';
import { RedisClient } from 'redis';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UserOrganization } from './organizations/organizations-users.model';
import { Organization } from './organizations/organizations.model';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from "./redis/redis.module";
import { REDIS } from "./redis/redis.constans";

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
      models: [User, Organization, UserOrganization],
      autoLoadModels: true
    }),
    UsersModule,
    OrganizationsModule,
    AuthModule,
    RedisModule
  ]
})

export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
          saveUninitialized: false,
          secret: configure.get("REDIS_SECRET"),
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passportInitialize(),
        passportSession(),
      )
      .forRoutes('*');
  }
}
