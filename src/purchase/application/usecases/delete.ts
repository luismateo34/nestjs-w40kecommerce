import {
  deleteDriven,
  DeleteDriver,
  findDriven,
} from 'src/purchase/domain/adapter/driver';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { DeleteOrder } from 'src/purchase/domain/port/driver/for-delete';

export class deleteMethod implements DeleteOrder {
  private service: DeleteDriver;
  constructor(readonly database: ormPurchase) {
    this.service = new DeleteDriver(
      new findDriven(database),
      new deleteDriven(database),
    );
  }
  async delete_Order(id: string): Promise<'success'> {
    return await this.service.delete_Order(id);
  }
}
