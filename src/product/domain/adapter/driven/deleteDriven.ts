import { ProductEntity } from '@/typeorm/ProductEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { deleteProductdriven } from '@/product/domain/port/driven/for-deleteProductdriven';

@Injectable()
export class DeleteProductService implements deleteProductdriven {
  constructor(
    @InjectRepository(ProductEntity)
    private service: Repository<ProductEntity>,
  ) {}
  async deleteProductId(id: string): Promise<void> {
    await this.service.delete({ id: id });
  }
}
