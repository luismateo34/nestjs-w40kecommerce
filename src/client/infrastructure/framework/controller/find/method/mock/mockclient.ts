import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
import { getClientDriving } from 'src/client/domain/port/driving/for-get';
import { Request } from 'express';

let order: OrderPurchase;
export const obj: client = {
  createdAt: new Date(),
  email: 'gatogordo@gmail.com',
  id: '1',
  lastname: 'gordo',
  name: 'gato',
  password: 'gatogordo123',
  purchase_order: [order],
  updatedAt: new Date(),
};

export class findMethodMock implements getClientDriving {
  //----
  async Get_Client(name: string, lastname: string) {
    if (typeof name === 'string' && typeof lastname === 'string') {
      return obj;
    }
  }
  //-----
  async Get_Client_Order_Purchase(id: string): Promise<OrderPurchase[]> {
    if (typeof id === 'string') {
      const resp = [order];
      return resp;
    }
  }
  async Get_Client_Id(id: string): Promise<client> {
    if (typeof id === 'string') {
      const obj = {} as client;
      return obj;
    }
  }
}
//____
export class checkmock {
  async cheq(req: Request, name: string, lastname: string) {
    if (
      req === null ||
      typeof name !== 'string' ||
      typeof lastname !== 'string'
    ) {
      return;
    }
    return;
  }
}
