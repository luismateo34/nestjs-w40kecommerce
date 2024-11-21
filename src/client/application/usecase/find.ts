import { FindDriven, findDriver } from 'src/client/domain/adapter/driver';
import { getClientDriver } from 'src/client/domain/port/driver/for-get';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class FindMethod implements getClientDriver {
  private service: findDriver;
  constructor(readonly database: ormclient) {
    this.service = new findDriver(new FindDriven(database));
  }
  async Get_Client_Order_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]> {
    return await this.service.Get_Client_Order_Purchase(name, lastname);
  }
  async Get_Client_Password(name: string, lastname: string): Promise<string> {
    return await this.service.Get_Client_Password(name, lastname);
  }
  async Get_Client_Product_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]> {
    return await this.service.Get_Client_Product_Purchase(name, lastname);
  }
}
