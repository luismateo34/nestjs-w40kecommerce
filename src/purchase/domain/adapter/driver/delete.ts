import { DeleteOrder } from '@/purchase/domain/port/driver/for-delete';
import { FindService } from '@/purchase/domain/adapter/driven/find';
import { DeleteOrder as deleteDriven } from '@/purchase/domain/adapter/driven/delete';

export class Delete implements DeleteOrder {
  constructor(
    private readonly FindService: FindService,
    private readonly deleteService: deleteDriven,
  ) {}
  async deleteOrder(id: string): Promise<Error | 'success'> {
    const order = await this.FindService.findById(id);
    if (order.id === undefined) {
      throw new Error('Order not found');
    }
    await this.deleteService.deleteOrder(order.id);
    return 'success';
  }
}
