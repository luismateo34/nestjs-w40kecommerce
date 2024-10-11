import { CreateOrder } from '@/purchase/domain/port/driver/for-create';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { totalDto } from '@/purchase/domain/validation/validate';
import { CreateOrder as createDriven } from '@/purchase/domain/adapter/driven/create';
import { validate } from 'class-validator';

export class CreateOrderImpl implements CreateOrder {
  constructor(private readonly method: createDriven) {}
  async create(order: orderCreate): Promise<Error | 'success'> {
    const dto = new totalDto();
    dto.amount = order.amount;
    dto.envoy = order.envoy;
    dto.date = order.date;
    dto.client = order.client;
    dto.products = order.products;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      return new Error('Error in the data');
    }
    await this.method.create(order);
    return 'success';
  }
}
