import { updateClientdriven } from '@/product/domain/port/driven/for-updateProductdriven';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { InjectProduct } from '@/product/infrastructure/ProductEntity';

class UpdateProductService implements updateClientdriven {
  constructor(private method: InjectProduct) {}
  async update_Product(id: string, product: createProduct): Promise<void> {
    await this.method.service.update({ id: id }, product);
  }
}
let inj: InjectProduct;
export const Update = new UpdateProductService(inj);
