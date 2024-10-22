import { createProduct } from '../../entity/entityInterfaceProduct';

export interface create {
  create_Product: (product: createProduct) => Promise<Error | 'success'>;
}
