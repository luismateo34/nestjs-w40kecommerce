import { getclient } from 'src/client/domain/port/driven/for-getClient-driven';
import { client } from '../../entity/entityInterfaceClient';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class FindDriven implements getclient {
  constructor(private client: ormclient) {}

  async Get_Client(name: string, lastname: string): Promise<client> {
    return await this.client.get_by_name_lastname(name, lastname);
  }
  async Get_Client_by_Id(id: string): Promise<client> {
    return await this.client.get_by_id(id);
  }

  async Get_Client_Order_Purchase(id: string): Promise<OrderPurchase[]> {
    const res = await this.client.get_by_id(id);
    return res.purchase_order;
  }
}
