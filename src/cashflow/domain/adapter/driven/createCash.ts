import { createCash as createcashdriver } from 'src/cashflow/domain/port/driven/for-create-cashflow-driven';
import { InjectCash } from 'src/cashflow/infrastructure/Cash.entity';
import { cash } from 'src/cashflow/domain/entity/entityInterfaceCashfolw';

class Create implements createcashdriver {
  constructor(private service = InjectCash) {}
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
    await this.service.cash.save(obj);
  }
}

export const createCash = new Create();
