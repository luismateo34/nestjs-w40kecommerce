import { UpdateOrder } from '@/purchase/domain/port/driver/for-update';
import { UpdateOrder as Update } from '@/purchase/domain/adapter/driven/update';
import { totalDto } from '@/purchase/domain/validation/validate';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { FindService } from '@/purchase/domain/adapter/driven/find';
import { validate } from 'class-validator';

export class UpdateOrderImpl implements UpdateOrder {
  constructor(
    private readonly method: Update,
    private readonly service: FindService,
  ) {}

  async updateEnvoy(id: string): Promise<Error | 'success'> {
    const order = await this.service.findById(id);
    if (order.id === undefined) {
      throw new Error('Not found');
    }
    await this.method.updateEnvoy(order.id);
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
