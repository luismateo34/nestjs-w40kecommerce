import { Column, Entity, Repository } from 'typeorm';
import { Base } from '../../config/base';
import { cash } from '../domain/entity/entityInterfaceCashflow';

@Entity({ name: 'cashflows' })
export class CashFlowEntity extends Base implements cash {
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

