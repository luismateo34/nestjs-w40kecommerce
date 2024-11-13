import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import { InjectCash } from 'src/cashflow/infrastructure/Cash.entity';
import { FindOrder } from 'src/purchase/domain/adapter/driver';

type updateType = Pick<updateMethod, 'update_Balance_Day'>;

class Update implements updateType {
  constructor(
    private service = InjectCash,
    private order = FindOrder,
  ) {}
  async update_Balance_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<void> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const orderFind = await this.order.find_Orders_Date(year, month, day);
    if (orderFind instanceof Error) {
      return;
    }
    const amount = orderFind
      .map((el) => el.amount)
      .reduce((acc, current) => current + acc, 0);
    await this.service.cash.update({ date: dayDate }, { balance_day: amount });
  }
}

export const method_update_Balance_Day = new Update();
