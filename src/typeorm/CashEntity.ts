import { Column, Entity } from 'typeorm';
import { Base } from '@/config/base';
import { cash } from '@/cashflow/domain/entity/entityInterfaceCashfolw';

@Entity({ name: 'cashflows' })
export class CashFlow extends Base implements cash {
  @Column()
  date: Date;
  @Column()
  balance_day: number;
  @Column()
  revenue: number;
  @Column()
  expenses: number;
  @Column()
  monthly_balance: [Date, number];
}
