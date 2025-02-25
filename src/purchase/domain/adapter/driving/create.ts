import { CreateOrder } from 'src/purchase/domain/port/driving/for-create';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { createType } from 'src/purchase/domain/port/driven/for-create-driven';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class CreateOrderImpl implements CreateOrder {
  constructor(private readonly method: createType) {}
  async create(order: orderCreate): Promise<OrderPurchase> {
    return await this.method.create(order);
  }
}
