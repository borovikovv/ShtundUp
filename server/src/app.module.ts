import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

const configure = new ConfigService();

@Module({
  controllers: [],
  providers: [AppService],
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
      models: [User],
      autoLoadModels: true
    }),
    UsersModule,
  ]
})

export class AppModule {}
