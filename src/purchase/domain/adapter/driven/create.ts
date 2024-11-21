import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { createType } from '../../port/driven/for-create-driven';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';

export class Create implements createType {
  constructor(private method: ormPurchase) {}
  async create(order: orderCreate): Promise<void> {
    await this.method.save(order);
  }
}
