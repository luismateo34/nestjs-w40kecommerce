import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { cash } from 'src/cashflow/domain/entity/entityInterfaceCashflow';

@Entity({ name: 'cashflows' })
export class CashFlowEntity implements cash {
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
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createdAt!: Date;
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updatedAt!: Date;
}
