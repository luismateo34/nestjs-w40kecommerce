import { create } from 'src/product/domain/port/driving/for-create';
import { createProduct as Product } from '../../entity/entityInterfaceProduct';
import { createProductdriven } from 'src/product/domain/port/driven/for-createProductdriven';

export class CreateProduct implements create {
  constructor(private readonly service: createProductdriven) {}
  async create_Product(product: Product): Promise<'success'> {
    await this.service.create_Product(product);
    return 'success';
  }
}
