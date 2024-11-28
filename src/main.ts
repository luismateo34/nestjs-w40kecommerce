import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));
  app.use(cookieParser(process.env.COOKIE_PASS));
  app.setGlobalPrefix('api');
}
bootstrap();
