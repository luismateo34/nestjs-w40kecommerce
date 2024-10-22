import { updateMethod } from '@/cashflow/domain/port/driven/for-updateCash-driven';
import { InjectCash } from '@/cashflow/infrastructure/CashEntity';
import { FindOrder } from '@/purchase/domain/adapter/driver';

type updateType = Pick<updateMethod, 'update_Balance_Month'>;

class Update implements updateType {
  constructor(
    private service: InjectCash,
    private order = FindOrder,
  ) {}
  async update_Balance_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const orderFind = await this.order.find_Orders_Month(year, month);
    if (orderFind instanceof Error) {
      return;
    }
    const amount = orderFind
      .map((el) => el.amount ?? 0)
      .reduce((acc, current) => current + acc, 0);
    await this.service.cash.update(
      { date: dayDate },
      { monthly_balance: [dayDate, amount] },
    );
  }
}
let inj: InjectCash;
export const  method_update_Balance_Month = new Update(inj, FindOrder);
