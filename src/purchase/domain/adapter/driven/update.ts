import { updateType } from '../../port/driven/for-update-driven';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { InjectOrder } from '@/purchase/infrastructure/PurchaseOrderEntity';

class UpdateOrder implements updateType {
  constructor(private method: InjectOrder) {}
  async update(order: orderCreate): Promise<void> {
    await this.method.order.save(order);
  }
  async update_Envoy(id: string): Promise<void> {
    await this.method.order.update({ id: id }, { envoy: true });
  }
}
let inject: InjectOrder;
export const Update = new UpdateOrder(inject);
