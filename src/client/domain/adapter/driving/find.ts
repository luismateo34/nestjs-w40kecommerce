import { getClientDriving } from 'src/client/domain/port/driving/for-get';
import { getclient } from 'src/client/domain/port/driven/for-getClient-driven';
import { client } from '../../entity/entityInterfaceClient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class Find implements getClientDriving {
  constructor(private method: getclient) {}
  async Get_Client(name: string, lastname: string): Promise<client> {
    return await this.method.Get_Client(name, lastname);
  }
  async Get_Client_Id(id: string): Promise<client> {
    return await this.method.Get_Client_by_Id(id);
  }
  async Get_Client_Order_Purchase(id: string): Promise<OrderPurchase[]> {
    const resp = await this.method.Get_Client_Order_Purchase(id);
    if (resp.length === 0) {
      throw new Error('no se encontro');
    }
    return resp;
  }
}
