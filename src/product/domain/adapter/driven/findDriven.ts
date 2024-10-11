import { findProductdriven } from '@/product/domain/port/driven/for-findProductdriven';
import { ProductEntity } from '@/typeorm/ProductEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProduct, productget } from '../../entity/entityInterfaceProduct';

@Injectable()
export class FindProductService implements findProductdriven {
  constructor(
    @InjectRepository(ProductEntity)
    private service: Repository<ProductEntity>,
  ) {}
  async findProductById(id: string): Promise<productget> {
    return await this.service.findOneBy({ id: id });
  }
  async findProductByName(name: string): Promise<productget> {
    return await this.service.findOneBy({ name: name });
  }
  async findProductsbyCategory(
    category_product: string,
  ): Promise<productget[]> {
    return await this.service.find({
      where: { category_product: category_product },
    });
  }
  async findProductsByFranchise(franchise: string): Promise<productget[]> {
    return await this.service.find({ where: { franchise: franchise } });
  }
  async findProductsByGender(gender: string): Promise<productget[]> {
    return await this.service.find({ where: { gender: gender } });
  }
  async findStockByproductId(id: string): Promise<number> {
    const resp = await this.service.findOneBy({ id: id });
    return resp.stock;
  }
  async findStockByproductName(name: string): Promise<number> {
    const resp = await this.service.findOneBy({ name: name });
    return resp.stock;
  }
}
