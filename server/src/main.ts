import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const configure = new ConfigService();

async function bootstrap() {
  const PORT = Number(configure.get("PORT"));
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  const config = new DocumentBuilder()
    .setTitle("ShtundUp")
    .setDescription("Friends, events, books and more...")
    .setVersion("1.0.0")
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`App run to ${PORT} port`));
  logger.log(`Application listening at ${await app.getUrl()}`);
}

bootstrap();
