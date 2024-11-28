import { ormProduct } from 'src/product/domain/entity/ormProduct';
import {
  DeleteDriven,
  DeleteProduct,
  FindDriven,
} from 'src/product/domain/adapter/driving';
import { Delete } from 'src/product/domain/port/driving/for-delete';

export class deleteMethod implements Delete {
  private service: DeleteProduct;
  constructor(readonly database: ormProduct) {
    this.service = new DeleteProduct(
      new DeleteDriven(database),
      new FindDriven(database),
    );
  }
  async delete_ProductId(id: string): Promise<'success'> {
    return await this.service.delete_ProductId(id);
  }
}
