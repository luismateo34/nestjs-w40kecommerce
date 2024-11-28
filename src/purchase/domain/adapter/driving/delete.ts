import { DeleteOrder } from 'src/purchase/domain/port/driving/for-delete';
import { findType } from 'src/purchase/domain/port/driven/for-find-diven';
import { deleteType } from 'src/purchase/domain/port/driven/for-delete-driven';

export class Delete implements DeleteOrder {
  constructor(
    private readonly FindService: findType,
    private readonly deleteService: deleteType,
  ) {}
  async delete_Order(id: string): Promise<'success'> {
    const order = await this.FindService.find_Id(id);
    if (order.id === undefined) {
      throw new Error('Order not found');
    }
    await this.deleteService.delete_Order(order.id);
    return 'success';
  }
}
