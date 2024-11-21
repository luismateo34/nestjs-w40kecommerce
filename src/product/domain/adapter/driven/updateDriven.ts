import { updateClientdriven } from 'src/product/domain/port/driven/for-updateProductdriven';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { ormProduct } from 'src/product/domain/entity/ormProduct';

export class UpdateDriven implements updateClientdriven {
  constructor(private method: ormProduct) {}
  async update_Product(id: string, product: createProduct): Promise<void> {
    await this.method.update_Product(id, product);
  }
}
