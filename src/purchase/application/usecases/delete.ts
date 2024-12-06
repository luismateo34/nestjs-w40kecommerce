import {
  deleteDriven,
  DeleteDriving,
  findDriven,
} from 'src/purchase/domain/adapter/driving';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { DeleteOrder } from 'src/purchase/domain/port/driving/for-delete';

export class deleteMethod implements DeleteOrder {
  private service: DeleteDriving;
  constructor(readonly database: ormPurchase) {
    this.service = new DeleteDriving(
      new findDriven(database),
      new deleteDriven(database),
    );
  }
  async delete_Order(id: string): Promise<'success'> {
    return await this.service.delete_Order(id);
  }
}
