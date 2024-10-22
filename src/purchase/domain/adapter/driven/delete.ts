import { deleteType } from '../../port/driven/for-delete-driven';
import { InjectOrder } from '@/purchase/infrastructure/PurchaseOrderEntity';

class DeleteOrder implements deleteType {
  constructor(private method: InjectOrder) {}
  async delete_Order(id: string): Promise<void> {
    await this.method.order.delete({ id: id });
  }
}
let inject: InjectOrder;
export const Delete = new DeleteOrder(inject);
