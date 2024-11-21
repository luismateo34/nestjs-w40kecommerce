import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';

type methodType = Pick<
  updateMethod,
  'update_Revenue_Day' | 'update_Revenue_Month'
>;

export class method_revenue implements methodType {
  constructor(readonly service: ormcashflow) {}
  async update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<void> {
    await this.service.update_Day_expense(
      new Date(year, month, day, 0, 0, 0),
      revenue,
    );
  }
  async update_Revenue_Month(year: number, month: number, day:number): Promise<void> {
    const expense = await this.service.find_month_range(
      new Date(year, month, 1, 0, 0, 0),
      new Date(year, month + 1, 1, 0, 0, 0),
    );
    const monthly = expense
      .map((el) => el.expenses)
      .reduce((acc, current) => current + acc, 0);
    await this.service.update_Day_expense(
      new Date(year, month, day, 0, 0, 0),
      monthly,
    );
  }
}
