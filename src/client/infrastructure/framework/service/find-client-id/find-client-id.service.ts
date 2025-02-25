import { Injectable, Inject } from '@nestjs/common';
import { FindMethod } from 'src/client/application/usecase/find';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export interface check {
  find: boolean;
  id: string;
  name: string;
  lastname: string;
  mesagge: string;
}

@Injectable()
export class FindClientIdService {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  async find_Orderpurchase_by_id(clientId: string): Promise<OrderPurchase[]> {
    return await this.find.Get_Client_Order_Purchase(clientId);
  }
  async check_name_by_id(id: string): Promise<check> {
    try {
      const nameCheq = await this.find.Get_Client_Id(id);
      const obj: check = {
        find: true,
        id: nameCheq.id,
        name: nameCheq.name,
        lastname: nameCheq.lastname,
        mesagge: 'succes',
      };
      return obj;
    } catch {
      const obj: check = {
        find: false,
        id: 'error',
        name: 'error',
        lastname: 'error',
        mesagge: 'cliente inexistente, error',
      };
      return obj;
    }
  }
}
