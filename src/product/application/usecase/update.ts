import { createProduct } from 'src/product/domain/entity/entityInterfaceProduct';
import {
  UpdateDriven,
  UpdateProduct,
  FindDriven,
} from 'src/product/domain/adapter/driving';
import { ormProduct } from 'src/product/domain/entity/ormProduct';
import { Update } from 'src/product/domain/port/driving/for-update';

export class updateMethod implements Update {
  private service: UpdateProduct;
  constructor(readonly database: ormProduct) {
    this.service = new UpdateProduct(
      new UpdateDriven(database),
      new FindDriven(database),
    );
  }
  async update_Product(id: string, product: createProduct): Promise<'success'> {
    return await this.service.update_Product(id, product);
  }
}
