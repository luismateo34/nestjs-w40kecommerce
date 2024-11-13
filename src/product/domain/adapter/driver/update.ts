import { Update } from '@/product/domain/port/driver/for-update';
import { createProduct } from '../../entity/entityInterfaceProduct';
import { updateClientdriven } from '@/product/domain/port/driven/for-updateProductdriven';
import { findProductdriven } from '@/product/domain/port/driven/for-findProductdriven';

export class UpdateProduct implements Update {
  constructor(
    private readonly service: updateClientdriven,
    private readonly findService: findProductdriven,
  ) {}
  async update_Product(id: string, product: createProduct): Promise<'success'> {
    const find = await this.findService.find_Product_Id(id);
    if (find.id === undefined) {
      throw new Error('no se encontro el producto');
    }
    await this.service.update_Product(id, product);
    return 'success';
  }
}
