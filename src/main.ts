import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));
  app.use(cookieParser(process.env.COOKIE_PASS));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Api ecommerce')
    .setDescription('Api para la tienda virtual')
    .setVersion('1.0')
    .addTag('routes')
    .addCookieAuth('access_token_admin')
    .addCookieAuth('access_token_client')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
}
bootstrap();
