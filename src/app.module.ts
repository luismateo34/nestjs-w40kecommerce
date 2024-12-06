import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
/*constroller*/
import { AppController } from './app.controller';
/*service*/
import { AppService } from './app.service';
/*typeorm options*/
import { TypeOrmoptions } from 'src/database/typeorm';
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
    TypeOrmModule.forRoot({ ...TypeOrmoptions }),
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    EventEmitterModule.forRoot(),
    AdminModule,
    MainCashflowModule,
    PurchaseModule,
    ProductModule,
    ClientModule,
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
