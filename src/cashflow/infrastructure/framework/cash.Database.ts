import { InjectRepository } from '@nestjs/typeorm';
import { CashFlowEntity } from './Cash.entity';
import { Between, Repository } from 'typeorm';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';
import { cash } from 'src/cashflow/domain/entity/entityInterfaceCashflow';

export class InjectCash implements ormcashflow {
  constructor(
    @InjectRepository(CashFlowEntity)
    private adminInject: Repository<CashFlowEntity>,
  ) {}
  async create_Cash_Order(order: cash): Promise<void> {
    await this.adminInject.save(order);
  }
  async find_month_range(
    first_Month_day: Date,
    last_Month_day: Date,
  ): Promise<cash[]> {
    return await this.adminInject.find({
      where: {
        date: Between(first_Month_day, last_Month_day),
      },
    });
  }
  async findOneBydate(date: Date): Promise<cash> {
    return await this.adminInject.findOneBy({ date: date });
  }
  async update_Date_monthly_balance(
    date: Date,
    monthly_balance: number,
  ): Promise<void> {
    await this.adminInject.update(
      { date: date },
      { monthly_balance: monthly_balance },
    );
  }
  async update_Day_balance(date: Date, balance_day: number): Promise<void> {
    await this.adminInject.update({ date: date }, { balance_day: balance_day });
  }
  // revenue
  async update_Date_monthly_revenue(
    date: Date,
    expenses: number,
  ): Promise<void> {
    await this.adminInject.update({ date: date }, { expenses: expenses });
  }
  async update_Day_revenue(date: Date, revenue: number): Promise<void> {
    await this.adminInject.update({ date: date }, { revenue: revenue });
  }
  // expense
  async update_Day_expense(date: Date, expenses: number): Promise<void> {
    await this.adminInject.update({ date: date }, { expenses: expenses });
  }
  async update_monthly_expense(date: Date, expenses: number): Promise<void> {
    await this.adminInject.update({ date: date }, { expenses: expenses });
  }
}
