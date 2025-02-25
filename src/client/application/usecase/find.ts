import { FindDriven, findDriving } from 'src/client/domain/adapter/driving';
import { getClientDriving } from 'src/client/domain/port/driving/for-get';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class FindMethod implements getClientDriving {
  private service: findDriving;
  constructor(readonly database: ormclient) {
    this.service = new findDriving(new FindDriven(database));
  }
  /*----*/
  async Get_Client(name: string, lastname: string): Promise<client> {
    return await this.service.Get_Client(name, lastname);
  }
  /*---*/
  async Get_Client_Order_Purchase(id: string): Promise<OrderPurchase[]> {
    const resp = await this.service.Get_Client_Order_Purchase(id);
    return resp;
  }
  /*----*/
  async Get_Client_Id(id: string): Promise<client> {
    return await this.service.Get_Client_Id(id);
  }
}
