import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CashService,
  CashFlowEntity,
} from 'src/cashflow/infrastructure/Cash.entity';

@Module({
  providers: [CashService],
  imports: [TypeOrmModule.forFeature([CashFlowEntity])],
})
export class CashflowModule {}
