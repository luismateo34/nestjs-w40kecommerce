import { createProduct } from "../../entity/entityInterfaceProduct";

export interface Update {
  updateProduct: (id: string, product: createProduct) => Promise<Error | 'success'>;
}
