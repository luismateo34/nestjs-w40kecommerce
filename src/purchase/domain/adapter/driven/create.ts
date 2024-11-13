import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { createType } from '../../port/driven/for-create-driven';
import { InjectOrder } from 'src/purchase/infrastructure/PurchaseOrder.entity';

class CreateOrder implements createType {
  constructor(private method = InjectOrder) {}
  async create(order: orderCreate): Promise<void> {
    await this.method.order.save(order);
  }
}
export const Create = new CreateOrder();
