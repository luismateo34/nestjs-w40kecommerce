import { createProductdriven } from 'src/product/domain/port/driven/for-createProductdriven';
import { createProduct } from 'src/product/domain/entity/entityInterfaceProduct';
import { ormProduct } from 'src/product/domain/entity/ormProduct';

export class CreateDriven implements createProductdriven {
  constructor(private serviceInject: ormProduct) {}
  async create_Product(Product: createProduct): Promise<void> {
    this.serviceInject.create(Product);
  }
}
