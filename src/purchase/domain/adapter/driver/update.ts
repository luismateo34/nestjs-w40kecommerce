import { UpdateOrder } from '@/purchase/domain/port/driver/for-update';
import { totalDto } from '@/purchase/domain/validation/validate';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { validate } from 'class-validator';
import { updateType } from '@/purchase/domain/port/driven/for-update-driven';
import { findType } from '@/purchase/domain/port/driven/for-find-diven';

export class UpdateOrderImpl implements UpdateOrder {
  constructor(
    private readonly method: updateType,
    private readonly service: findType,
  ) {}

  async update_Envoy(id: string): Promise<Error | 'success'> {
    const order = await this.service.find_Id(id);
    if (order.id === undefined) {
      throw new Error('Not found');
    }
    await this.method.update_Envoy(order.id);
    return 'success';
  }

  async update(order: orderCreate): Promise<Error | 'success'> {
    const dto = new totalDto();
    dto.amount = order.amount;
    dto.envoy = order.envoy;
    dto.date = order.date;
    dto.client = order.client;
    dto.products = order.products;
    const errorSerch = await validate(dto);
    if (errorSerch.length > 0) {
      return new Error('Error validation');
    }
    await this.method.update(dto);
    return 'success';
  }
}
