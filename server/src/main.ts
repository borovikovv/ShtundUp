import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configure = new ConfigService();

async function bootstrap() {
  const PORT = Number(configure.get("PORT"));
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("ShtundUp")
    .setDescription("Friends, events, books and more...")
    .setVersion("1.0.0")
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`App run to ${PORT} port`));
}

bootstrap();
