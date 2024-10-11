import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4080,
      username: 'userdatabase',
      password: 'databasepassword',
      database: 'batabaseNest',
      entities: [resolve(__dirname + './../**/*.entity{.ts,.js}')],
      migrations: [resolve(__dirname + './../../migrations/*{.ts,.js}')],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
