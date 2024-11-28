import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { createDriven, CreateDriver } from 'src/purchase/domain/adapter/driving';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { OrderWithoutDate } from 'src/purchase/application/validate/order';

export class createMethod {
  private service: CreateDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new CreateDriver(new createDriven(database));
  }
  async create(orderType: OrderWithoutDate): Promise<'success'> {
    const dayDate = new Date();
    const order: orderCreate = { ...orderType, date: dayDate, envoy: false };
    return await this.service.create(order);
  }
}
