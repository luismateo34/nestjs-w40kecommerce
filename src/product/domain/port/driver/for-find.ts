import { productget } from '../../entity/entityInterfaceProduct';

export interface Find {
  findProductById: (id: string) => Promise<productget | Error>;
  findProductByName: (name: string) => Promise<productget | Error>;
  findStockByproductName: (name: string) => Promise<number | Error>;
  findStockByproductId: (id: string) => Promise<number | Error>;
  findProductsbyCategory: (
    category_product: string,
  ) => Promise<productget[] | Error>;
  findProductsByFranchise: (franchise: string) => Promise<productget[] | Error>;
  findProductsByGender: (gender: string) => Promise<productget[] | Error>;
}
