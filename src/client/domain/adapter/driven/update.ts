import { updateType } from 'src/client/domain/port/driven/for-updateClient-driven';
import { hash } from 'bcrypt';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class Updatedriven implements updateType {
  constructor(private client: ormclient) {}
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void> {
    await this.client.Update_Client_Email(name, lastname, email);
  }
  async Update_Client_Name(name: string, lastname: string): Promise<void> {
    await this.client.Update_Client_Name(name, lastname);
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    const hashpass = await hash(password, 8);
    await this.client.Update_Client_Password(name, lastname, hashpass);
  }
  async Update_Purchase_orders(
    id: string,
    order: OrderPurchase[],
  ): Promise<void> {
    await this.client.update_purchase_orders(id, order);
  }
}
