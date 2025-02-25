import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';

type methodType = Pick<
  updateMethod,
  'update_Expense_Day' | 'update_Expense_Month'
>;

export class method_expense implements methodType {
  constructor(readonly service: ormcashflow) {}

  async update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<void> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    await this.service.update_Day_expense(dayDate, expenses);
  }
  async update_Expense_Month(year: number, month: number): Promise<void> {
    const dayDate = new Date(year, month, 0, 0, 0, 0);
    const monthly_expense = await this.service.find_month_range(
      new Date(year, month, 1, 0, 0, 0),
      dayDate,
    );
    const monthly = monthly_expense
      .map((el) => el.expenses ?? 0)
      .reduce((acc, current) => current + acc, 0);
    await this.service.update_Day_expense(dayDate, monthly);
  }
}
