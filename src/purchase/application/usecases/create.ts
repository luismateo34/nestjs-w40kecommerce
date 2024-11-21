import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { createDriven, CreateDriver } from 'src/purchase/domain/adapter/driver';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { CreateOrder } from 'src/purchase/domain/port/driver/for-create';

export class createMethod implements CreateOrder {
  private service: CreateDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new CreateDriver(new createDriven(database));
  }
  async create(orderType: orderCreate): Promise<'success'> {
    return await this.service.create(orderType);
  }
}
