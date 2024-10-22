import { getclient } from '@/client/domain/port/driven/for-getClient-driven';
import { client } from '../../entity/entityInterfaceClient';
import { InjectClient } from '@/client/infrastructure/ClientEntity';

class ForGetClient implements getclient {
  constructor(private client: InjectClient) {}

  async Get_Client(name: string, lastname: string): Promise<client> {
    return await this.client.admin.findOneBy({
      name: name,
      lastname: lastname,
    });
  }

  async Get_Client_Order_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]> {
    const res = await this.client.admin.findOneBy({
      name: name,
      lastname: lastname,
    });
    const order = res.purchase_order;
    return order;
  }
  async Get_Client_Password(name: string, lastname: string): Promise<string> {
    const resp = await this.client.admin.findOneBy({
      name: name,
      lastname: lastname,
    });
    return resp.password;
  }
}

let inj: InjectClient;
export const Find = new ForGetClient(inj);
