import { deleteProductdriven } from '@/product/domain/port/driven/for-deleteProductdriven';
import { InjectProduct } from '@/product/infrastructure/ProductEntity';

class DeleteProductService implements deleteProductdriven {
  constructor(private method: InjectProduct) {}
  async delete_ProductId(id: string): Promise<void> {
    await this.method.service.delete({ id: id });
  }
}
let inj: InjectProduct;
export const Delete = new DeleteProductService(inj);
