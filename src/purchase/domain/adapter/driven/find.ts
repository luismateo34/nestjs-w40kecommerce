import { findType } from '../../port/driven/for-find-diven';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';

export class Find implements findType {
  constructor(private method: ormPurchase) {}
  async find_by_Id(id: string): Promise<OrderPurchase> {
    const resp = await this.method.find_Id(id);
    return resp;
  }
  /*----*/
  async find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]> {
    const nextday = day + 1;
    const resp = await this.method.find_orders_by_day(
      new Date(year, month, day, 0),
      new Date(year, month, nextday, 0),
    );
    return resp;
  }
  /*----*/
  async find_Orders_Month(
    year: number,
    month: number,
  ): Promise<OrderPurchase[]> {
    const monthNext = month + 1;
    const resp = await this.method.find_orders_by_month(
      new Date(year, month, 1, 0),
      new Date(year, monthNext, 1, 0),
    );
    return resp;
  }
}
