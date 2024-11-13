import { findType } from '../../port/driven/for-find-diven';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';
import {
  InjectOrder,
  OrderEntity,
} from 'src/purchase/infrastructure/PurchaseOrder.entity';
import { Between } from 'typeorm';

class FindService implements findType {
  constructor(private method = InjectOrder) {}
  async find_Client(name: string): Promise<OrderEntity[]> {
    const resp = await this.method.order.find({ where: { client: name } });
    return resp;
  }
  async find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]> {
    const nextday = day + 1;
    const resp = await this.method.order.find({
      where: {
        date: Between(
          new Date(year, month, day, 0),
          new Date(year, month, nextday, 0),
        ),
      },
    });
    return resp;
  }
  async find_Orders_Month(
    year: number,
    month: number,
  ): Promise<OrderPurchase[]> {
    const monthNext = month + 1;
    const resp = await this.method.order.find({
      where: {
        date: Between(new Date(year, month, 1), new Date(year, monthNext, 1)),
      },
    });
    return resp;
  }

  async find_Id(id: string): Promise<OrderEntity> {
    const resp = await this.method.order.findOneBy({ id: id });
    return resp;
  }

  async find_client_Id(name: string, id: string): Promise<OrderPurchase> {
    const resp = await this.find_Client(name);
    const search = resp.find((el) => el.id === id);
    return search;
  }
}
export const Find = new FindService();
