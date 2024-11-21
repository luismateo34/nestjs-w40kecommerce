import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';
import { findDriven, findDriver } from 'src/purchase/domain/adapter/driver';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { find } from 'src/purchase/domain/port/driver/for-find';

export class FindMethod implements find {
  private service: findDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new findDriver(new findDriven(database));
  }
  async find_Client(name: string): Promise<OrderPurchase[]> {
    return await this.service.find_Client(name);
  }
  async find_Id(id: string): Promise<OrderPurchase> {
    return await this.service.find_Id(id);
  }
  async find_Id_Client(id: string, name: string): Promise<OrderPurchase> {
    return await this.service.find_Id_Client(id, name);
  }
  async find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]> {
    return await this.service.find_Orders_Date(year, month, day);
  }
  async find_Orders_Month(
    year: number,
    month: number,
  ): Promise<OrderPurchase[]> {
    return await this.service.find_Orders_Month(year, month);
  }
}
