import { Injectable, Inject } from '@nestjs/common';
import { UpdateMethod } from 'src/client/application/usecase/update';

@Injectable()
export class UpdateClientService {
  constructor(@Inject('UpdateClient') private readonly update: UpdateMethod) {}
  async clientUpdate_Purchase(id: string, order: string[]) {
    await this.update.Update_Purchase_orders(id, order);
  }
}
