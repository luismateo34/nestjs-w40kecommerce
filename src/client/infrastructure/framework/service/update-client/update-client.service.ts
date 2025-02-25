import { Injectable, Inject } from '@nestjs/common';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { purchase } from 'src/client/domain/type/purchase';
//import { UpdateMethodFactory } from '../../factoryclient/factoryclient.module';

@Injectable()
export class UpdateClientService {
  constructor(
    //@Inject(UpdateMethodFactory) private readonly update: UpdateMethod,
    @Inject('UpdateMethod') private readonly update: UpdateMethod,
  ) {}
  async clientUpdate_Purchase(id: string, order: purchase) {
    await this.update.Update_Purchase_orders(id, order);
  }
}
