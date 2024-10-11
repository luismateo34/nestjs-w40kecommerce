import { Find } from '@/product/domain/port/driver/for-find';
import { FindProductService } from '@/product/domain/adapter/driven/findDriven';
import { productget } from '../../entity/entityInterfaceProduct';

export class FindProduct implements Find {
  constructor(private readonly service: FindProductService) {}
  async findStockByproductName(name: string): Promise<number | Error> {
    const search = await this.service.findStockByproductName(name);
    if (search === undefined) {
      throw new Error('no se encontro el producto');
    }
    return search;
  }
  async findStockByproductId(id: string): Promise<number | Error> {
    const search = await this.service.findStockByproductId(id);
    if (search === undefined) {
      throw new Error('no se encontro el producto');
    }
    return search;
  }
  async findProductById(id: string): Promise<productget | Error> {
    const search = await this.service.findProductById(id);
    if (search.id === undefined) {
      throw new Error('no se encontro el producto');
    }
    return search;
  }
  async findProductByName(name: string): Promise<productget | Error> {
    const resp = await this.service.findProductByName(name);
    if (resp.id === undefined) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
  async findProductsbyCategory(
    category_product: string,
  ): Promise<productget[] | Error> {
    const resp = await this.service.findProductsbyCategory(category_product);
    if (resp.length === 0) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
  async findProductsByFranchise(
    franchise: string,
  ): Promise<productget[] | Error> {
    const resp = await this.service.findProductsByFranchise(franchise);
    if (resp.length === 0) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
  async findProductsByGender(gender: string): Promise<productget[] | Error> {
    const resp = await this.service.findProductsByGender(gender);
    if (resp.length === 0) {
      throw new Error('no se encontro el producto');
    }
    return resp;
  }
}
