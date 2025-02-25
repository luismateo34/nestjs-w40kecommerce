import { findProductdriven } from 'src/product/domain/port/driven/for-findProductdriven';
import { product, productget } from '../../entity/entityInterfaceProduct';
import { ormProduct } from 'src/product/domain/entity/ormProduct';

export class FindDriven implements findProductdriven {
  constructor(private method: ormProduct) {}
  async find_Product_Id(id: string): Promise<productget> {
    return await this.method.find_Product_by_Id(id);
  }
  async find_Product_Name(name: string): Promise<productget> {
    return await this.method.find_Product_Name(name);
  }
  async find_Products_Category(
    category_product: string,
  ): Promise<productget[]> {
    return await this.method.find_Products_Category(category_product);
  }
  async find_Products_Franchise(franchise: string): Promise<productget[]> {
    return await this.method.find_Products_Franchise(franchise);
  }
  async find_Products_Gender(gender: string): Promise<productget[]> {
    return await this.method.find_Products_Gender(gender);
  }
  async find_Stock_productId(id: string): Promise<number> {
    return await this.method.find_Stock_productId(id);
  }
  async find_Stock_product_Name(name: string): Promise<number> {
    return await this.method.find_Stock_product_Name(name);
  }
  async find_Product_All_Id(id: string): Promise<product> {
    return await this.method.find_Product_All_Id(id);
  }
}
