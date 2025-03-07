import { updateType } from '../../port/driven/for-update-driven';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';

export class Update implements updateType {
  constructor(private method: ormPurchase) {}
  async update(order: orderCreate): Promise<OrderPurchase> {
    const resp = await this.method.save(order);
    return resp;
  }
  async update_Envoy(id: string): Promise<void> {
    await this.method.update_Envoy(id, true);
  }
}
