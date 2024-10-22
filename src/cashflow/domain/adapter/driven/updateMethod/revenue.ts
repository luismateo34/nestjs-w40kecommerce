import { updateMethod } from '@/cashflow/domain/port/driven/for-updateCash-driven';
import { InjectCash } from '@/cashflow/infrastructure/CashEntity';
import { Between } from 'typeorm';

type methodType = Pick<
  updateMethod,
  'update_Revenue_Day' | 'update_Revenue_Month'
>;

class Method implements methodType {
  constructor(private service: InjectCash) {}
  async update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<void> {
    await this.service.cash.update(
      { date: new Date(year, month, day, 0, 0, 0) },
      { revenue: revenue },
    );
  }
  async update_Revenue_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    const expense = await this.service.cash.find({
      where: {
        date: Between(
          new Date(year, month, 1, 0, 0, 0),
          new Date(year, month, day, 0, 0, 0),
        ),
      },
    });
    const monthly = expense
      .map((el) => el.expenses)
      .reduce((acc, current) => current + acc, 0);
    await this.service.cash.update(
      { date: new Date(year, month, day, 0, 0, 0) },
      { monthly_expenses: monthly },
    );
  }
}

let inj: InjectCash;
export const method_revenue = new Method(inj);
