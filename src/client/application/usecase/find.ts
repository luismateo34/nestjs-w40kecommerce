import { FindDriven, findDriving } from 'src/client/domain/adapter/driving';
import { getClientDriving } from 'src/client/domain/port/driving/for-get';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { client } from '@/client/domain/entity/entityInterfaceClient';

export class FindMethod implements getClientDriving {
  private service: findDriving;
  constructor(readonly database: ormclient) {
    this.service = new findDriving(new FindDriven(database));
  }
  async Get_Client_Order_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]> {
    return await this.service.Get_Client_Order_Purchase(name, lastname);
  }

  async Get_Client(name: string, lastname: string): Promise<client> {
    return await this.service.Get_Client(name, lastname);
  }
  async Get_Client_Product_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]> {
    return await this.service.Get_Client_Product_Purchase(name, lastname);
  }
  async Get_Client_Id(id: string): Promise<string[]> {
    return await this.service.Get_Client_Id(id);
  }
}
