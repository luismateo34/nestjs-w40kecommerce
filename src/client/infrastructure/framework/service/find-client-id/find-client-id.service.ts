import { Injectable, Inject } from '@nestjs/common';
import { FindMethod } from 'src/client/application/usecase/find';

@Injectable()
export class FindClientIdService {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  private async getById(id: string) {
    return await this.find.Get_Client_Id(id);
  }
  async find_Orderpurchase_by_id(clientId: string) {
    return await this.find.Get_Client_Order_Purchase(clientId);
  }
  async check_name_by_id(id: string) {
    try {
      const respId = await this.getById(id);
      const nameCheq = await this.find.Get_Client(respId[0], respId[1]);
      const obj = {
        find: true,
        id: nameCheq.id,
        name: nameCheq.name,
        lastname: nameCheq.lastname,
        mesagge: 'succes',
      };
      return obj;
    } catch {
      const obj = {
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
