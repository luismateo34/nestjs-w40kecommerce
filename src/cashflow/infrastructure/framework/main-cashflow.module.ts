import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetConfigModule } from 'src/config/config.module';
/*--usecase--*/
import { FindMethod } from 'src/cashflow/application/usacases/Find';
import { CreateMethod } from 'src/cashflow/application/usacases/create';
import { UpdateMethod } from 'src/cashflow/application/usacases/update';
/*DATABASE provider*/
import { InjectCash } from 'src/cashflow/infrastructure/framework/cash.Database';
/*-Controller-*/
import { CreateCashController } from 'src/cashflow/infrastructure/framework/controller/create-cash/create-cash.controller';
import { FindCashController } from 'src/cashflow/infrastructure/framework/controller/find-cash/find-cash.controller';
import { UpdateCashController } from 'src/cashflow/infrastructure/framework/controller/update-cash/update-cash.controller';
//--method--
import { BalanceDayMethod } from 'src/cashflow/infrastructure/framework/controller/find-cash/method/balanceDayMethod';
import { ExpenseMonthMethod } from 'src/cashflow/infrastructure/framework/controller/find-cash/method/expenseMonth';
import { RevenueMonthMethod } from 'src/cashflow/infrastructure/framework/controller/find-cash/method/revenueMonthMethod';
import { RevenueDayMethod } from 'src/cashflow/infrastructure/framework/controller/find-cash/method/revenueDayMethod';
import { ExpenseDayMethod } from 'src/cashflow/infrastructure/framework/controller/find-cash/method/expenseDayMethod';
import { BalanceMonthMethod } from 'src/cashflow/infrastructure/framework/controller/find-cash/method/balanceMonthMethod';
/*-Entity--*/
import { CashFlowEntity } from 'src/cashflow/infrastructure/framework/Cash.entity';
import { OrderEntity } from 'src/purchase/infrastructure/framework/PurchaseOrder.entity';
/*-----*/
import { AdminModule } from 'src/administrator/infrastructure/framework/admin.module';
import { Order } from 'src/purchase/infrastructure/framework/database.purchase';
/*---*/
const FindMethodFactory = {
  provide: 'FindMethod',
  useFactory: (repository: InjectCash) => new FindMethod(repository),
  inject: [InjectCash],
};
const CreateMethodFactory = {
  provide: 'CreateMethod',
  useFactory: (repository: InjectCash) => new CreateMethod(repository),
  inject: [InjectCash],
};
const UpdateMethodFactory = {
  provide: 'UpdateMethod',
  useFactory: (repository: InjectCash, order: Order) =>
    new UpdateMethod(repository, order),
  inject: [InjectCash, Order],
};

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([CashFlowEntity, OrderEntity]),
    SetConfigModule,
  ],
  controllers: [CreateCashController, FindCashController, UpdateCashController],
  providers: [
    FindMethodFactory,
    CreateMethodFactory,
    UpdateMethodFactory,
    InjectCash,
    Order,
    BalanceDayMethod,
    BalanceMonthMethod,
    ExpenseDayMethod,
    ExpenseMonthMethod,
    RevenueDayMethod,
    RevenueMonthMethod,
  ],
})
export class MainCashflowModule {}
