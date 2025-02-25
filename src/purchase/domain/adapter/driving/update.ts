import { UpdateOrder } from 'src/purchase/domain/port/driving/for-update';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { updateType } from 'src/purchase/domain/port/driven/for-update-driven';
import { findType } from 'src/purchase/domain/port/driven/for-find-diven';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';

export class UpdateOrderImpl implements UpdateOrder {
  constructor(
    private readonly method: updateType,
    private readonly service: findType,
  ) {}

  async update_Envoy(id: string): Promise<'success'> {
    const order = await this.service.find_by_Id(id);
    if (order.id === undefined) {
      throw new Error('Not found');
    }
    await this.method.update_Envoy(order.id);
    return 'success';
  }

  async update(order: orderCreate): Promise<OrderPurchase> {
    const resp = await this.method.update(order);
    return resp;
  }
}
