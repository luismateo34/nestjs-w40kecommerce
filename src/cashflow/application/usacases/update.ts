import {
  updateCashmethodDriven,
  Update,
} from 'src/cashflow/domain/adapter/driver';
import {
  string_month_spanish,
  NumberMonth,
} from 'src/cashflow/application/month/month';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';

export class UpdateMethod {
  private service: Update;
  constructor(
    readonly database: ormcashflow,
    readonly purchase: ormPurchase,
  ) {
    this.service = new Update(new updateCashmethodDriven(database, purchase));
  }
  async update_Balance_Day(
    year: number,
    month_string: string_month_spanish,
    day: number,
  ): Promise<'success'> {
    const month = NumberMonth(month_string);
    return await this.service.update_Balance_Day(year, month, day);
  }
  async update_Balance_Month(
    year: number,
    month_string: string_month_spanish,
  ): Promise<'success'> {
    const month = NumberMonth(month_string);
    return await this.service.update_Expense_Month(year, month);
  }
  async update_Expense_Day(
    year: number,
    month_string: string_month_spanish,
    day: number,
    expenses: number,
  ): Promise<'success'> {
    const month = NumberMonth(month_string);
    return await this.service.update_Expense_Day(year, month, day, expenses);
  }
  async update_Expense_Month(
    year: number,
    month_string: string_month_spanish,
  ): Promise<'success'> {
    const month = NumberMonth(month_string);
    return await this.service.update_Expense_Month(year, month);
  }
  async update_Revenue_Day(
    year: number,
    month_string: string_month_spanish,
    day: number,
    revenue: number,
  ): Promise<'success'> {
    const month = NumberMonth(month_string);
    return await this.service.update_Revenue_Day(year, month, day, revenue);
  }
  async update_Revenue_Month(
    year: number,
    month_string: string_month_spanish,
  ): Promise<'success'> {
    const month = NumberMonth(month_string);
    return await this.service.update_Revenue_Month(year, month);
  }
}
