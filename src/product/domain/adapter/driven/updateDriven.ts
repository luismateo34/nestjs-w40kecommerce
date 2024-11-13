import { updateClientdriven } from 'src/product/domain/port/driven/for-updateProductdriven';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { InjectProduct } from 'src/product/infrastructure/Product.entity';

class UpdateProductService implements updateClientdriven {
  constructor(private method = InjectProduct) {}
  async update_Product(id: string, product: createProduct): Promise<void> {
    await this.method.service.update({ id: id }, product);
  }
}
export const Update = new UpdateProductService();
