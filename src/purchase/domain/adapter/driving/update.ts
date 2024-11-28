import { UpdateOrder } from 'src/purchase/domain/port/driving/for-update';
import { totalDto } from 'src/purchase/domain/validation/validate';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { validate } from 'class-validator';
import { updateType } from 'src/purchase/domain/port/driven/for-update-driven';
import { findType } from 'src/purchase/domain/port/driven/for-find-diven';

export class UpdateOrderImpl implements UpdateOrder {
  constructor(
    private readonly method: updateType,
    private readonly service: findType,
  ) {}

  async update_Envoy(id: string): Promise<'success'> {
    const order = await this.service.find_Id(id);
    if (order.id === undefined) {
      throw new Error('Not found');
    }
    await this.method.update_Envoy(order.id);
    return 'success';
  }

  async update(order: orderCreate): Promise<'success'> {
    const dto = new totalDto();
    dto.amount = order.amount;
    dto.envoy = order.envoy;
    dto.date = order.date;
    dto.client = order.client;
    dto.products = order.products;
    const errorSerch = await validate(dto);
    if (errorSerch.length > 0) {
      throw new Error('Error validation');
    }
    await this.method.update(dto);
    return 'success';
  }
}
