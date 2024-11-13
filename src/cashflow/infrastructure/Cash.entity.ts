import { Column, Entity, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base } from '../../config/base';
import { cash } from '../domain/entity/entityInterfaceCashfolw';

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
  monthly_balance: number;
  @Column({ nullable: true })
  monthly_expenses: number;
  @Column({ nullable: true })
  monthly_revenue: number;
}
@Injectable()
export class Cash {
  constructor(
    @InjectRepository(CashFlow)
    private adminInject: Repository<CashFlow>,
  ) {
    this.cash = this.adminInject;
  }
  readonly cash: Repository<CashFlow>;
}
let inj: Cash;

class provider {
  constructor(readonly service: Cash) {}
  readonly cash = this.service.cash;
}

export const InjectCash = new provider(inj);
