import { Set } from '@/product/domain/port/driver/for-set';
import { SetProductService } from '@/product/domain/adapter/driven/setDriven';
import { FindProductService } from '@/product/domain/adapter/driven/findDriven';

export class SetProduct implements Set {
  constructor(
    private readonly service: SetProductService,
    private readonly findService: FindProductService,
  ) {}
  async setDiscountProduct(
    id: string,
    discount: number,
  ): Promise<Error | 'success'> {
    const findProduct = await this.findService.findProductById(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.setDiscountProduct(findProduct.id, discount);
    return 'success';
  }
  async setPriceProduct(id: string, price: number): Promise<Error | 'success'> {
    const findProduct = await this.findService.findProductById(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.setPriceProduct(findProduct.id, price);
    return 'success';
  }
  async setStockProduct(id: string, stock: number): Promise<Error | 'success'> {
    const findProduct = await this.findService.findProductById(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.setStockProduct(findProduct.id, stock);
    return 'success';
  }
}
