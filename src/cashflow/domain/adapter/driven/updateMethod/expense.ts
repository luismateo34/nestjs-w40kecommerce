import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import { InjectCash } from 'src/cashflow/infrastructure/Cash.entity';
import { Between } from 'typeorm';

type methodType = Pick<
  updateMethod,
  'update_Expense_Day' | 'update_Expense_Month'
>;

class Method implements methodType {
  constructor(private service = InjectCash) {}

  async update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<void> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    await this.service.cash.update({ date: dayDate }, { expenses: expenses });
  }
  async update_Expense_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const monthly_expense = await this.service.cash.find({
      where: {
        date: Between(new Date(year, month, 1, 0, 0, 0), dayDate),
      },
    });
    const monthly = monthly_expense
      .map((el) => el.expenses ?? 0)
      .reduce((acc, current) => current + acc, 0);
    await this.service.cash.update(
      { date: dayDate },
      { monthly_expenses: monthly },
    );
  }
}
export const method_expense = new Method();
