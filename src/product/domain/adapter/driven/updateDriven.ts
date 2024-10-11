import { updateClientdriven } from '@/product/domain/port/driven/for-updateProductdriven';
import { ProductEntity } from '@/typeorm/ProductEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProduct } from '../../entity/entityInterfaceProduct';

@Injectable()
export class UpdateProductService implements updateClientdriven {
  constructor(
    @InjectRepository(ProductEntity)
    private service: Repository<ProductEntity>,
  ) {}
  async updateProduct(id: string, product: createProduct): Promise<void> {
    await this.service.update({ id: id }, product);
  }
}
