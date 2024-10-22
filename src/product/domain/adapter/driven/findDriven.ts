import { findProductdriven } from '@/product/domain/port/driven/for-findProductdriven';
import { productget } from '../../entity/entityInterfaceProduct';
import { InjectProduct } from '@/product/infrastructure/ProductEntity';

class FindProduct implements findProductdriven {
  constructor(private method: InjectProduct) {}
  async find_Product_Id(id: string): Promise<productget> {
    return await this.method.service.findOneBy({ id: id });
  }
  async find_Product_Name(name: string): Promise<productget> {
    return await this.method.service.findOneBy({ name: name });
  }
  async find_Products_Category(
    category_product: string,
  ): Promise<productget[]> {
    return await this.method.service.find({
      where: { category_product: category_product },
    });
  }
  async find_Products_Franchise(franchise: string): Promise<productget[]> {
    return await this.method.service.find({ where: { franchise: franchise } });
  }
  async find_Products_Gender(gender: string): Promise<productget[]> {
    return await this.method.service.find({ where: { gender: gender } });
  }
  async find_Stock_productId(id: string): Promise<number> {
    const resp = await this.method.service.findOneBy({ id: id });
    return resp.stock;
  }
  async find_Stock_product_Name(name: string): Promise<number> {
    const resp = await this.method.service.findOneBy({ name: name });
    return resp.stock;
  }
}
let inj: InjectProduct;
export const Find = new FindProduct(inj);
