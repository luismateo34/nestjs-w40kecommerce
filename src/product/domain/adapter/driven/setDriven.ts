import { stockProductdriven } from 'src/product/domain/port/driven/for-setProductdriven';
import { ormProduct } from 'src/product/domain/entity/ormProduct';

export class SetterDriven implements stockProductdriven {
  constructor(private method: ormProduct) {}
  async set_Discount_Product(id: string, discount: number): Promise<void> {
    await this.method.set_Discount_Product_update(id, discount);
  }
  async set_Price_Product(id: string, price: number): Promise<void> {
    await this.method.set_Price_Product_update(id, price);
  }
  async set_Stock_Product(id: string, stock: number): Promise<void> {
    await this.method.set_Stock_Product_update(id, stock);
  }
}
