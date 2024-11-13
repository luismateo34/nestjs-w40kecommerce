import { createProduct } from '../../entity/entityInterfaceProduct';

export interface Update {
  update_Product: (id: string, product: createProduct) => Promise<'success'>;
}
