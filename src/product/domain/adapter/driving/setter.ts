import { Set } from 'src/product/domain/port/driving/for-set';
import { stockProductdriven as setterdriven } from 'src/product/domain/port/driven/for-setProductdriven';
import { findProductdriven } from 'src/product/domain/port/driven/for-findProductdriven';

export class SetProduct implements Set {
  constructor(
    private readonly service: setterdriven,
    private readonly findService: findProductdriven,
  ) {}
  async set_Discount_Product(id: string, discount: number): Promise<'success'> {
    const findProduct = await this.findService.find_Product_Id(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.set_Discount_Product(findProduct.id, discount);
    return 'success';
  }
  async set_Price_Product(id: string, price: number): Promise<'success'> {
    const findProduct = await this.findService.find_Product_Id(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.set_Price_Product(findProduct.id, price);
    return 'success';
  }
  async set_Stock_Product(id: string, stock: number): Promise<'success'> {
    const findProduct = await this.findService.find_Product_Id(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.set_Stock_Product(findProduct.id, stock);
    return 'success';
  }
}
