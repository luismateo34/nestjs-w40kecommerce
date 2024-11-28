import {
  CreateDriven,
  CreateProduct,
} from 'src/product/domain/adapter/driving';
import { create } from 'src/product/domain/port/driving/for-create';
import { ormProduct } from 'src/product/domain/entity/ormProduct';
import { createProduct } from '@/product/domain/entity/entityInterfaceProduct';

export class CreateMethod implements create {
  private service: CreateProduct;
  constructor(readonly database: ormProduct) {
    this.service = new CreateProduct(new CreateDriven(database));
  }
  async create_Product(product: createProduct): Promise<'success'> {
    return await this.service.create_Product(product);
  }
}
