import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
//import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));
  app.use(cookieParser(process.env.COOKIE_PASS));
  app.setGlobalPrefix('api');
  //app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}
bootstrap();
