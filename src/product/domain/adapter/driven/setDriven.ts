import { stockProductdriven } from '@/product/domain/port/driven/for-setProductdriven';
import { InjectProduct } from '@/product/infrastructure/ProductEntity';

class SetProductService implements stockProductdriven {
  constructor(private method: InjectProduct) {}
  async set_Discount_Product(id: string, discount: number): Promise<void> {
    await this.method.service.update(
      { id: id },
      { percentaje_discount: discount },
    );
  }
  async set_Price_Product(id: string, price: number): Promise<void> {
    await this.method.service.update({ id: id }, { price: price });
  }
  async set_Stock_Product(id: string, stock: number): Promise<void> {
    await this.method.service.update({ id: id }, { stock: stock });
  }
}
let inj: InjectProduct;
export const Setter = new SetProductService(inj);
