import { createCash as createcashdriver } from 'src/cashflow/domain/port/driven/for-create-cashflow-driven';
import { cash } from 'src/cashflow/domain/entity/entityInterfaceCashflow';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';

export class createCashDriven implements createcashdriver {
  constructor(private service: ormcashflow) {}
  async create_Cash_Order_day(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    const newdate = new Date(year, month, day, 0, 0, 0);
    const obj: cash = {
      date: newdate,
      balance_day: null,
      expenses: null,
      monthly_balance: null,
      revenue: null,
      monthly_expenses: null,
      monthly_revenue: null,
    };
    await this.service.create_Cash_Order(obj);
  }
}
