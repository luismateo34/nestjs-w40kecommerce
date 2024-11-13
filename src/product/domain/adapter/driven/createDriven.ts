import { createProductdriven } from 'src/product/domain/port/driven/for-createProductdriven';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { InjectProduct } from 'src/product/infrastructure/Product.entity';

class CreateProductService implements createProductdriven {
  constructor(private serviceInject = InjectProduct) {}
  async create_Product(product: createProduct): Promise<void> {
    this.serviceInject.service.create(product);
  }
}
export const Create = new CreateProductService();
