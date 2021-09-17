import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configure = new ConfigService();

@Module({
  controllers: [UsersController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: configure.get("HOST"),
      port: Number(configure.get("POSTGRES_PORT")),
      username: configure.get("POSTGRES_NAME"),
      password: configure.get("POSTGRES_PASSWORD"),
      database: configure.get("POSTGRES_DB"),
      models: [],
      autoLoadModels: true
    }),
  ]
})

export class AppModule {}
