import { Delete } from '@/product/domain/port/driver/for-delete';
import { DeleteProductService } from '@/product/domain/adapter/driven/deleteDriven';
import { FindProductService } from '@/product/domain/adapter/driven/findDriven';

export class DeleteProduct implements Delete {
  constructor(
    private readonly service: DeleteProductService,
    private readonly findService: FindProductService,
  ) {}
  async deleteProductId(id: string): Promise<Error | 'success'> {
    const findProduct = await this.findService.findProductById(id);
    if (findProduct.id === undefined) {
      throw new Error('producto no encontrado');
    }
    await this.service.deleteProductId(id);
    return 'success';
  }
}
