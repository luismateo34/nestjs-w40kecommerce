import {
  updateDriven,
  updateDriver,
  findDriven,
} from 'src/purchase/domain/adapter/driver';
import { UpdateOrder } from 'src/purchase/domain/port/driver/for-update';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { orderCreate } from '@/purchase/domain/usecase/usecases';

export class updateMethod implements UpdateOrder {
  private service: updateDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new updateDriver(
      new updateDriven(database),
      new findDriven(database),
    );
  }
  async update_Envoy(id: string): Promise<'success'> {
    return await this.service.update_Envoy(id);
  }
  async update(order: orderCreate): Promise<'success'> {
    return await this.service.update(order);
  }
}
