import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { createType } from '../../port/driven/for-create-driven';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export class Create implements createType {
  constructor(private method: ormPurchase) {}
  async create(order: orderCreate): Promise<OrderPurchase> {
    return await this.method.save(order);
  }
}
