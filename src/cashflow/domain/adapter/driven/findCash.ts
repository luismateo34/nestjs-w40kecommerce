import { findmethod } from 'src/cashflow/domain/port/driven/for-findCash-driven';
import { InjectCash } from 'src/cashflow/infrastructure/Cash.entity';
import { Between } from 'typeorm';

class FindCash implements findmethod {
  constructor(private service = InjectCash) {}
  async find_Balance_day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const resp = await this.service.cash.findOneBy({ date: dayDate });
    const balance = resp.balance_day;
    const result: [Date, number] = [dayDate, balance];
    return result;
  }

  async find_Balance_Month(
    year: number,
    month: number,
  ): Promise<[Date, number]> {
    const resp = await this.service.cash.find({
      where: {
        date: Between(new Date(year, month, 1), new Date(year, month + 1, 1)),
      },
    });
    const balance = resp
      .map((el) => el.monthly_balance)
      .sort((a, b) => b - a)[0];
    const ArrResp: [Date, number] = [new Date(year, month, 1), balance];
    return ArrResp;
  }

  async find_Expense_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const resp = await this.service.cash.findOneBy({ date: dayDate });
    const result: [Date, number] = [dayDate, resp.expenses];
    return result;
  }

  async find_Revenue_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const resp = await this.service.cash.findOneBy({ date: dayDate });
    const result: [Date, number] = [dayDate, resp.revenue];
    return result;
  }

  async find_Expense_Month(
    year: number,
    month: number,
  ): Promise<[Date, number]> {
    const resp = await this.service.cash.find({
      where: {
        date: Between(new Date(year, month, 1), new Date(year, month + 1, 1)),
      },
    });
    const balance = resp.map((el) => el.monthly_expenses);
    const ArrResp: [Date, number] = [
      new Date(year, month, 1),
      Math.max(...balance),
    ];
    return ArrResp;
  }

  async find_Revenue_Month(
    year: number,
    month: number,
  ): Promise<[Date, number]> {
    const resp = await this.service.cash.find({
      where: {
        date: Between(new Date(year, month, 1), new Date(year, month + 1, 1)),
      },
    });
    const balance = resp.map((el) => el.monthly_revenue);

    const ArrResp: [Date, number] = [
      new Date(year, month, 1),
      Math.max(...balance),
    ];
    return ArrResp;
  }
}

export const FindCashmethod = new FindCash();
