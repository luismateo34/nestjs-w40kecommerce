import { CreateOrder } from '@/purchase/domain/port/driver/for-create';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { totalDto } from '@/purchase/domain/validation/validate';
import { validate } from 'class-validator';
import { createType } from '@/purchase/domain/port/driven/for-create-driven';

export class CreateOrderImpl implements CreateOrder {
  constructor(private readonly method: createType) {}
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
