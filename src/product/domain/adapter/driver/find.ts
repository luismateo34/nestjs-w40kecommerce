import { Find } from '@/product/domain/port/driver/for-find';
import { productget } from '../../entity/entityInterfaceProduct';
import { findProductdriven } from '@/product/domain/port/driven/for-findProductdriven';

export class FindProduct implements Find {
  constructor(private readonly service: findProductdriven) {}
  async find_Stock_productId(name: string): Promise<number | Error> {
    const search = await this.service.find_Stock_product_Name(name);
    if (search === undefined) {
      throw new Error('no se encontro el producto');
    }
    return search;
  }
  async find_Stock_Product_by_Id(id: string): Promise<productget | Error> {
    const search = await this.service.find_Product_Id(id);
    if (search.id === undefined) {
      throw new Error('no se encontro el producto');
    }
    return search;
  }
  async find_Stock_productName(name: string): Promise<number | Error> {
    const search = await this.service.find_Stock_product_Name(name);
    if (search === undefined) {
      throw new Error('no se encontro el producto');
    }
    return search;
  }
  async find_Product_by_Name(name: string): Promise<productget | Error> {
    const resp = await this.service.find_Product_Name(name);
    if (resp.id === undefined) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
  async find_Products_Category(
    category_product: string,
  ): Promise<productget[] | Error> {
    const resp = await this.service.find_Products_Category(category_product);
    if (resp.length === 0) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
  async find_Products_Franchise(
    franchise: string,
  ): Promise<productget[] | Error> {
    const resp = await this.service.find_Products_Franchise(franchise);
    if (resp.length === 0) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
  async find_Products_Gender(gender: string): Promise<productget[] | Error> {
    const resp = await this.service.find_Products_Gender(gender);
    if (resp.length === 0) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
}
