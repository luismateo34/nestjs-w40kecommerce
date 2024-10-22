import { getClientDriver } from '@/client/domain/port/driver/for-get';
import { getclient } from '@/client/domain/port/driven/for-getClient-driven';

export class Find implements getClientDriver {
  constructor(private method: getclient) {}
  async Get_Client_Password(
    name: string,
    lastname: string,
  ): Promise<string | Error> {
    const resp = await this.method.Get_Client(name, lastname);
    if (resp.password === undefined) {
      throw new Error('no se encontro');
    }
    return resp.password;
  }
  async Get_Client_Product_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[] | Error> {
    const resp = await this.method.Get_Client_Order_Purchase(name, lastname);
    if (resp.length === 0) {
      throw new Error('no se encontro');
    }
    return resp;
  }
  async Get_Client_Order_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[] | Error> {
    const resp = await this.method.Get_Client_Order_Purchase(name, lastname);
    if (resp.length === 0) {
      throw new Error();
    }
    return resp;
  }
}
