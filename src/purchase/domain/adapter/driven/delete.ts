import { deleteType } from '../../port/driven/for-delete-driven';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';

export class Delete implements deleteType {
  constructor(private method: ormPurchase) {}
  async delete_Order(id: string): Promise<void> {
    await this.method.delete(id);
  }
}
