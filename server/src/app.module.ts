import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [UsersController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'olexii',
      password: 'SudoPass7573User',
      database: 'shtundup',
      models: [],
      autoLoadModels: true
    }),
  ]
})
export class AppModule {}
