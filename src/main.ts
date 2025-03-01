import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser(process.env.COOKIE_PASS));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Api ecommerce')
    .setDescription('Api para la tienda virtual de warhammer')
    .setVersion('1.0')
    .addTag('routes')
    //.addCookieAuth('access_token_admin')
    //.addCookieAuth('access_token_client')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger.json',
  });

  await app.listen(Number(process.env.PORT));
}
bootstrap();
