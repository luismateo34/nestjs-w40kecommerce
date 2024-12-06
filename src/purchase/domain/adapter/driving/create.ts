import { CreateOrder } from 'src/purchase/domain/port/driving/for-create';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { totalDto } from 'src/purchase/domain/validation/validate';
import { validate } from 'class-validator';
import { createType } from 'src/purchase/domain/port/driven/for-create-driven';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class CreateOrderImpl implements CreateOrder {
  constructor(private readonly method: createType) {}
  async create(order: orderCreate): Promise<OrderPurchase> {
    const dto = new totalDto();
    dto.amount = order.amount;
    dto.envoy = order.envoy;
    dto.client = order.client;
    dto.products = order.products;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('Error in the data');
    }
    return await this.method.create(order);
  }
}
