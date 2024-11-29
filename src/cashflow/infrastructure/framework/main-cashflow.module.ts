import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*--usecase--*/
import { FindMethod } from 'src/cashflow/application/usacases/Find';
import { CreateMethod } from 'src/cashflow/application/usacases/create';
import { UpdateMethod } from 'src/cashflow/application/usacases/update';
/*DATABASE provider*/
import { InjectCash } from 'src/cashflow/infrastructure/cash.Database';
import { Order } from 'src/purchase/infrastructure/database.purchase';
/*-Controller-*/
import { CreateCashController } from 'src/cashflow/infrastructure/framework/controller/create-cash/create-cash.controller';
import { FindCashController } from 'src/cashflow/infrastructure/framework/controller/find-cash/find-cash.controller';
import { UpdateCashController } from 'src/cashflow/infrastructure/framework/controller/update-cash/update-cash.controller';
/*strategies*/
import { JwtStrategy } from 'src/administrator/infrastructure/framework/strategies/jwt/jwt.strategy';
/*-Entity--*/
import { CashFlowEntity } from 'src/cashflow/infrastructure/Cash.entity';
import { OrderEntity } from 'src/purchase/infrastructure/PurchaseOrder.entity';
/*-----*/
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
/*---*/

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([CashFlowEntity, OrderEntity]),
  ],
  controllers: [CreateCashController, FindCashController, UpdateCashController],
  providers: [
    JwtStrategy,
    {
      provide: 'database',
      useClass: InjectCash,
    },
    {
      provide: 'purchase',
      useClass: Order,
    },
    {
      provide: 'FindMethod',
      useFactory: (repository: InjectCash) => new FindMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'CreateMethod',
      useFactory: (repository: InjectCash) => new CreateMethod(repository),
      inject: ['database'],
    },
    {
      provide: 'UpdateMethod',
      useFactory: (repository: InjectCash, order: Order) =>
        new UpdateMethod(repository, order),
      inject: ['database'],
    },
  ],
})
export class MainCashflowModule {}
