import { createProduct } from '../../entity/entityInterfaceProduct';

export interface create {
  createProduct: (product: createProduct) => Promise<Error | 'success'>;
}
