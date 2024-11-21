import { ormProduct } from 'src/product/domain/entity/ormProduct';
import {
  SetterDriven,
  SetProduct,
  FindDriven,
} from 'src/product/domain/adapter/driver';
import { Set } from 'src/product/domain/port/driver/for-set';

export class SettingMethod implements Set {
  private service: SetProduct;
  constructor(readonly database: ormProduct) {
    this.service = new SetProduct(
      new SetterDriven(database),
      new FindDriven(database),
    );
  }
  async set_Discount_Product(id: string, discount: number): Promise<'success'> {
    return await this.service.set_Discount_Product(id, discount);
  }
  async set_Price_Product(id: string, price: number): Promise<'success'> {
    return await this.service.set_Price_Product(id, price);
  }
  async set_Stock_Product(id: string, stock: number): Promise<'success'> {
    return await this.service.set_Stock_Product(id, stock);
  }
}
