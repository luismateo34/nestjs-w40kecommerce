import {
  updateDriven,
  updateDriving,
  findDriven,
} from 'src/purchase/domain/adapter/driving';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class updateMethod {
  private service: updateDriving;
  constructor(readonly database: ormPurchase) {
    this.service = new updateDriving(
      new updateDriven(database),
      new findDriven(database),
    );
  }
  // pasa de false a true
  async update_Envoy(id: string): Promise<'success'> {
    return await this.service.update_Envoy(id);
  }
  async update(order: orderCreate): Promise<OrderPurchase> {
    return await this.service.update(order);
  }
}
