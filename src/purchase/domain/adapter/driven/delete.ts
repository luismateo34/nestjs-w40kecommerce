import { deleteType } from '../../port/driven/for-delete-driven';
import { InjectOrder } from 'src/purchase/infrastructure/PurchaseOrder.entity';

class DeleteOrder implements deleteType {
  constructor(private method = InjectOrder) {}
  async delete_Order(id: string): Promise<void> {
    await this.method.order.delete({ id: id });
  }
}
export const Delete = new DeleteOrder();
