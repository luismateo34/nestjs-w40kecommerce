import { Delete } from '@/product/domain/port/driver/for-delete';
import { deleteProductdriven } from '@/product/domain/port/driven/for-deleteProductdriven';
import { findProductdriven } from '@/product/domain/port/driven/for-findProductdriven';

export class DeleteProduct implements Delete {
  constructor(
    private readonly service: deleteProductdriven,
    private readonly findService: findProductdriven,
  ) {}
  async delete_ProductId(id: string): Promise<'success'> {
    const findProduct = await this.findService.find_Product_Id(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.delete_ProductId(id);
    return 'success';
  }
}
