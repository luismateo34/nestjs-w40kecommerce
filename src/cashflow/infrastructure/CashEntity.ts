import { Column, Entity, Repository } from 'typeorm';
import { Base } from '@/config/base';
import { cash } from '@/cashflow/domain/entity/entityInterfaceCashfolw';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Entity({ name: 'cashflows' })
export class CashFlow extends Base implements cash {
  @Column()
  date: Date;
  @Column({ nullable: true })
  balance_day: number;
  @Column({ nullable: true })
  revenue: number;
  @Column({ nullable: true })
  expenses: number;
  @Column({ nullable: true })
  monthly_balance: [Date, number];
  @Column({ nullable: true })
  monthly_expenses: number;
  @Column({ nullable: true })
  monthly_revenue: number;
}
@Injectable()
export class InjectCash {
  constructor(
    @InjectRepository(CashFlow)
    private adminInject: Repository<CashFlow>,
  ) {
    this.cash = this.adminInject;
  }
  readonly cash: Repository<CashFlow>;
}
