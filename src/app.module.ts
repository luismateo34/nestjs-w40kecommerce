import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmoptions } from 'src/database/typeorm';
import { AuthModule } from 'src/administrator/infrastructure/framework/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...TypeOrmoptions }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
