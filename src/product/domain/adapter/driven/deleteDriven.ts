import { deleteProductdriven } from 'src/product/domain/port/driven/for-deleteProductdriven';
import { ormProduct } from 'src/product/domain/entity/ormProduct';

export class DeleteDriven implements deleteProductdriven {
  constructor(private method: ormProduct) {}
  async delete_ProductId(id: string): Promise<void> {
    await this.method.delete(id)
  }
}
