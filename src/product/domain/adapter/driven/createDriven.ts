import { createProductdriven } from '@/product/domain/port/driven/for-createProductdriven';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { InjectProduct } from '@/product/infrastructure/ProductEntity';

class CreateProductService implements createProductdriven {
  constructor(private serviceInject: InjectProduct) {}
  async create_Product(product: createProduct): Promise<void> {
    this.serviceInject.service.create(product);
  }
}

let inj: InjectProduct;
export const Create = new CreateProductService(inj);
