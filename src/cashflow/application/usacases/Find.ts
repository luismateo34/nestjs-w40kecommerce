import { FindCashmethodDriven, Find } from 'src/cashflow/domain/adapter/driver';
import {
  string_month_spanish,
  NumberMonth,
} from 'src/cashflow/application/month/month';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';

export class FindMethod {
  private service: Find;
  constructor(readonly database: ormcashflow) {
    this.service = new Find(new FindCashmethodDriven(database));
  }
  async find_Balance_Year_Month_Day(
    year: number,
    month_string: string_month_spanish,
    day: number,
  ): Promise<[Date, number]> {
    const month = NumberMonth(month_string);
    return await this.service.find_Balance_Year_Month_Day(year, month, day);
  }
  async find_Expense_Month(
    year: number,
    month_string: string_month_spanish,
  ): Promise<[Date, number]> {
    const month = NumberMonth(month_string);
    return await this.service.find_Expense_Month(year, month);
  }
  async find_Expense_Year_Month_Day(
    year: number,
    month_string: string_month_spanish,
    day: number,
  ): Promise<[Date, number]> {
    const month = NumberMonth(month_string);
    return await this.service.find_Expense_Year_Month_Day(year, month, day);
  }
  async find_Revenue_Month(
    year: number,
    month_string: string_month_spanish,
  ): Promise<[Date, number]> {
    const month = NumberMonth(month_string);
    return await this.service.find_Revenue_Month(year, month);
  }
  async find_Revenue_Year_Month_Day(
    year: number,
    month_string: string_month_spanish,
    day: number,
  ): Promise<[Date, number]> {
    const month = NumberMonth(month_string);
    return await this.service.find_Balance_Year_Month_Day(year, month, day);
  }
}
