import { deleteProductdriven } from 'src/product/domain/port/driven/for-deleteProductdriven';
import { InjectProduct } from 'src/product/infrastructure/Product.entity';

class DeleteProductService implements deleteProductdriven {
  constructor(private method = InjectProduct) {}
  async delete_ProductId(id: string): Promise<void> {
    await this.method.service.delete({ id: id });
  }
}
export const Delete = new DeleteProductService();
