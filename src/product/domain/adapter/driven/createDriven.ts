import { createProductdriven } from '@/product/domain/port/driven/for-createProductdriven';
import { ProductEntity } from '@/typeorm/ProductEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProduct } from '../../entity/entityInterfaceProduct';

@Injectable()
export class CreateProductService implements createProductdriven {
  constructor(
    @InjectRepository(ProductEntity)
    private service: Repository<ProductEntity>,
  ) {}
  async createProduct(product: createProduct): Promise<void> {
    this.service.create(product);
  }
}
