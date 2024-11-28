import { ormProduct } from 'src/product/domain/entity/ormProduct';
import { FindDriven, FindProduct } from 'src/product/domain/adapter/driving';
import { Find } from 'src/product/domain/port/driving/for-find';
import { productget } from '@/product/domain/entity/entityInterfaceProduct';

export class findMethod implements Find {
  private service: FindProduct;
  constructor(readonly database: ormProduct) {
    this.service = new FindProduct(new FindDriven(database));
  }
  async find_Stock_productName(name: string): Promise<number> {
    return await this.service.find_Stock_productName(name);
  }
  async find_Stock_productId(id: string): Promise<number> {
    return await this.service.find_Stock_productId(id);
  }
  async find_Product_by_Name(name: string): Promise<productget> {
    return await this.service.find_Product_by_Name(name);
  }
  async find_Products_Category(
    category_product: string,
  ): Promise<productget[]> {
    return await this.service.find_Products_Category(category_product);
  }
  async find_Products_Franchise(franchise: string): Promise<productget[]> {
    return await this.service.find_Products_Franchise(franchise);
  }
  async find_Products_Gender(gender: string): Promise<productget[]> {
    return await this.service.find_Products_Gender(gender);
  }
  async find_Stock_Product_by_Id(id: string): Promise<productget> {
    return await this.service.find_Stock_Product_by_Id(id);
  }
}
