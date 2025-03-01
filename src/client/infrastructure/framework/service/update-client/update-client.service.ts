import { Injectable, Inject } from '@nestjs/common';
import { UpdateMethod } from 'src/client/application/usecase/update';
import { purchase } from 'src/client/domain/type/purchase';

@Injectable()
export class UpdateClientService {
  constructor(@Inject('UpdateMethod') private readonly update: UpdateMethod) {}
  async clientUpdate_Purchase(id: string, order: purchase) {
    await this.update.Update_Purchase_orders(id, order);
  }
}
