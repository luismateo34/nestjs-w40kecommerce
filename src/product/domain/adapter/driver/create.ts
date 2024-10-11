import { create } from '@/product/domain/port/driver/for-create';
import { CreateProductService } from '@/product/domain/adapter/driven/createDriven';
import { ProductDto } from '@/product/domain/validate/validate';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { validate } from 'class-validator';

export class CreateProduct implements create {
  constructor(private readonly service: CreateProductService) {}
  async createProduct(product: createProduct): Promise<Error | 'success'> {
    const dto = new ProductDto();
    dto.category_product = product.category_product;
    dto.order_product = product.order_product;
    dto.percentaje_discount = product.percentaje_discount;
    dto.price = product.price;
    dto.status = product.status;
    dto.name = product.name;
    dto.franchise = product.franchise;
    dto.gender = product.gender;
    dto.stock = product.stock;
    const err = await validate(dto);
    if (err.length > 0) {
      throw new Error('datos no validos');
    }
    await this.service.createProduct(product);
    return 'success';
  }
}
