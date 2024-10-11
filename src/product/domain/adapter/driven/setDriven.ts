import { stockProductdriven } from '@/product/domain/port/driven/for-setProductdriven';
import { ProductEntity } from '@/typeorm/ProductEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SetProductService implements stockProductdriven {
  constructor(
    @InjectRepository(ProductEntity)
    private service: Repository<ProductEntity>,
  ) {}
  async setDiscountProduct(id: string, discount: number): Promise<void> {
    await this.service.update({ id: id }, { percentaje_discount: discount });
  }
  async setPriceProduct(id: string, price: number): Promise<void> {
    await this.service.update({ id: id }, { price: price });
  }
  async setStockProduct(id: string, stock: number): Promise<void> {
    await this.service.update({ id: id }, { stock: stock });
  }
}
