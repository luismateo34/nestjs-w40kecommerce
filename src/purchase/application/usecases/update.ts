import {
  updateDriven,
  updateDriver,
  findDriven,
} from 'src/purchase/domain/adapter/driving';
import { UpdateOrder } from 'src/purchase/domain/port/driving/for-update';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { OrderWithoutDate } from 'src/purchase/application/validate/order';

export class updateMethod implements UpdateOrder {
  private service: updateDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new updateDriver(
      new updateDriven(database),
      new findDriven(database),
    );
  }
  // pasa de false a true
  async update_Envoy(id: string): Promise<'success'> {
    return await this.service.update_Envoy(id);
  }
  async update(order: OrderWithoutDate): Promise<'success'> {
    const dayDate = new Date();
    const orderUpdate: orderCreate = { ...order, date: dayDate, envoy: false };
    return await this.service.update(orderUpdate);
  }
}
