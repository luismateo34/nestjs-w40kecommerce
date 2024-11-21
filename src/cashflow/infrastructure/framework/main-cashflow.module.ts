import { Module } from '@nestjs/common';
import { JwtMethod } from 'src/administrator/infrastructure/framework/service/jwt/jwt.service';
import { FindMethod } from 'src/cashflow/application/usacases/Find';
import { CreateMethod } from 'src/cashflow/application/usacases/create';
import { UpdateMethod } from 'src/cashflow/application/usacases/update';
import { InjectCash } from 'src/cashflow/infrastructure/cash.Database';
import { Order } from 'src/purchase/infrastructure/database.purchase';

@Module({
  imports: [JwtMethod],
  providers: [
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
