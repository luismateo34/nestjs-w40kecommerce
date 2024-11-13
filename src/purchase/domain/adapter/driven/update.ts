import { updateType } from '../../port/driven/for-update-driven';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { InjectOrder } from 'src/purchase/infrastructure/PurchaseOrder.entity';

class UpdateOrder implements updateType {
  constructor(private method = InjectOrder) {}
  async update(order: orderCreate): Promise<void> {
    await this.method.order.save(order);
  }
  async update_Envoy(id: string): Promise<void> {
    await this.method.order.update({ id: id }, { envoy: true });
  }
}
export const Update = new UpdateOrder();
