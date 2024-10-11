import { Update } from '@/product/domain/port/driver/for-update';
import { UpdateProductService } from '@/product/domain/adapter/driven/updateDriven';
import { FindProductService } from '@/product/domain/adapter/driven/findDriven';
import { createProduct } from '../../entity/entityInterfaceProduct';

export class UpdateProduct implements Update {
  constructor(
    private readonly service: UpdateProductService,
    private readonly findService: FindProductService,
  ) {}
  async updateProduct(
    id: string,
    product: createProduct,
  ): Promise<Error | 'success'> {
    const find = await this.findService.findProductById(id);
    if (find.id === undefined) {
      throw new Error('no se encontro el producto');
    }
    await this.service.updateProduct(id, product);
    return 'success';
  }
}
