import {
  CreateCash,
  createCashDriven,
} from 'src/cashflow/domain/adapter/driver';
import {
  string_month_spanish,
  NumberMonth,
} from 'src/cashflow/application/month/month';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';

export class CreateMethod {
  private method: CreateCash;
  constructor(readonly database: ormcashflow) {
    this.method = new CreateCash(new createCashDriven(database));
  }
  async create_Cash_Order_day(
    year: number,
    month: string_month_spanish,
    day: number,
  ): Promise<'success'> {
    const number_month = NumberMonth(month);
    return await this.method.create_Cash_Order_day(year, number_month, day);
  }
}
