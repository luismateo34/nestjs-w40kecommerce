import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
import { findDriven, findDriver } from 'src/purchase/domain/adapter/driving';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import {
  NumberMonth,
  string_month_spanish,
} from 'src/cashflow/application/month/month';
import { dateFind } from 'src/purchase/application/interface/FindType';

export class FindMethod implements dateFind {
  private service: findDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new findDriver(new findDriven(database));
  }
  /*----*/
  async find_Client(name: string): Promise<OrderPurchase[]> {
    return await this.service.find_Client(name);
  }
  /*----*/
  async find_Id(id: string): Promise<OrderPurchase> {
    return await this.service.find_Id(id);
  }
  /*----*/
  async find_Id_Client(id: string, name: string): Promise<OrderPurchase> {
    return await this.service.find_Id_Client(id, name);
  }
  /*----*/
  async find_Orders_Date(
    day: number,
    year: number,
    month: string_month_spanish,
  ): Promise<OrderPurchase[]> {
    const monthNum = NumberMonth(month);
    return await this.service.find_Orders_Date(year, monthNum, day);
  }
  /*----*/
  async find_Orders_Month(
    month: string_month_spanish,
    year: number,
  ): Promise<OrderPurchase[]> {
    const monthNum = NumberMonth(month);
    return await this.service.find_Orders_Month(year, monthNum);
  }
}
