import { updateMethod } from 'src/cashflow/domain/port/driven/for-updateCash-driven';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';

type updateType = Pick<
  updateMethod,
  'update_Balance_Month' | 'update_Balance_Day'
>;

export class method_update_Balance implements updateType {
  constructor(
    readonly service: ormcashflow,
    readonly order: ormPurchase,
  ) {}
  async update_Balance_Month(year: number, month: number): Promise<void> {
    try {
      const dayDate = new Date(year, month, 1, 0, 0, 0);
      const nextMonth = new Date(year, month + 1, 1, 0, 0);
      const orderFind = await this.order.find_orders_by_month(
        dayDate,
        nextMonth,
      );
      const amount = orderFind
        .map((el) => el.amount ?? 0)
        .reduce((acc, current) => current + acc, 0);
      await this.service.update_Date_monthly_balance(dayDate, amount);
    } catch {
      throw new Error('Error al actualizar el balance mensual');
    }
  }
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
    await this.service.update_Date_monthly_balance(dayDate, amount);
  }
}
