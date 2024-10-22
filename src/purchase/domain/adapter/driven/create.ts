import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { createType } from '../../port/driven/for-create-driven';
import { InjectOrder } from '@/purchase/infrastructure/PurchaseOrderEntity';

class CreateOrder implements createType {
  constructor(private method: InjectOrder) {}
  async create(order: orderCreate): Promise<void> {
    await this.method.order.save(order);
  }
}

let inject: InjectOrder;
export const Create = new CreateOrder(inject);
