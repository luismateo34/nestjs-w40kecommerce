import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import {
  method_update_Balance_Day,
  method_update_Balance_Month,
  method_expense,
  method_revenue,
} from 'src/cashflow/domain/adapter/driven/updateMethod';

class Update implements updateMethod {
  async update_Balance_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    await method_update_Balance_Day.update_Balance_Day(year, month, day);
  }
  async update_Balance_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    await method_update_Balance_Month.update_Balance_Month(year, month, day);
  }
  async update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<void> {
    await method_expense.update_Expense_Day(year, month, day, expenses);
  }
  async update_Expense_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    await method_expense.update_Expense_Month(year, month, day);
  }
  async update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<void> {
    await method_revenue.update_Revenue_Day(year, month, day, revenue);
  }
  async update_Revenue_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    await method_revenue.update_Revenue_Month(year, month, day);
  }
}
export const updateCashmethod = new Update();
