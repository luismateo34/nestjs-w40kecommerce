import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*usecase*/
import { createMethod } from 'src/purchase/application/usecases/create';
import { FindMethod } from 'src/purchase/application/usecases/find';
import { deleteMethod } from 'src/purchase/application/usecases/delete';
import { updateMethod } from 'src/purchase/application/usecases/update';
/*-module-*/
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
/*-database-*/
import { Order } from 'src/purchase/infrastructure/database.purchase';
/*strategies*/
import { JwtStrategy } from 'src/administrator/infrastructure/framework/strategies/jwt/jwt.strategy';
/*entity*/
import { OrderEntity } from 'src/purchase/infrastructure/PurchaseOrder.entity';

@Module({
  imports: [AdminModule, JwtStrategy, TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    JwtStrategy,
    {
      provide: 'database',
      useClass: Order,
    },
    {
      provide: 'createMethod',
      useFactory: (repository: Order) => new createMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'createMethod',
      useFactory: (repository: Order) => new createMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'FindMethod',
      useFactory: (repository: Order) => new FindMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'deleteMethod',
      useFactory: (repository: Order) => new deleteMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'updateMethod',
      useFactory: (repository: Order) => new updateMethod(repository),
      inject: ['database'],
    },
  ],
})
export class PurchaseModule {}
