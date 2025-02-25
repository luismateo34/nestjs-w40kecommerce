import { Module } from '@nestjs/common';
import { resolve } from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
/*constroller*/
import { AppController } from './app.controller';
/*service*/
import { AppService } from './app.service';
/*Modules*/
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
import { MainCashflowModule } from 'src/cashflow/infrastructure/framework/main-cashflow.module';
import { PurchaseModule } from 'src/purchase/infrastructure/framework/purchase.module';
import { ProductModule } from 'src/product/infrastructure/framework/product.module';
import { ClientModule } from 'src/client/infrastructure/framework/client.module';
/*modules paths*/
import { routes } from 'src/administrator/application/router/router';
import { routes as cashRoutes } from 'src/cashflow/application/routes/routes';
import { clientRoute } from 'src/client/application/routes/clientRoutes';
import { productRoute } from 'src/product/application/routes/productRoute';
import { purchaseRoute } from 'src/purchase/application/routes/purchaseRoutes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    EventEmitterModule.forRoot(),
    AdminModule,
    MainCashflowModule,
    PurchaseModule,
    ProductModule,
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      //entities: [resolve(__dirname + '/../**/*.entity{.ts,.js}')],
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: [resolve(__dirname + '/../../migrations/*{.ts,.js}')],
      synchronize: false,
      migrationsRun: true,
      logging: true,
    }),
    RouterModule.register([
      {
        path: `${routes.admin}`,
        module: AdminModule,
      },
      {
        path: `${cashRoutes.cashflow}`,
        module: MainCashflowModule,
      },
      {
        path: `${clientRoute.client}`,
        module: ClientModule,
      },
      {
        path: `${purchaseRoute.purchase}`,
        module: PurchaseModule,
      },
      {
        path: `${productRoute.product}`,
        module: ProductModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
