import { productget, createProduct } from '../entity/entityInterfaceProduct';
export interface usecases {
  findProductById: (id: string) => Promise<productget>;
  findProductByName: (name: string) => Promise<productget>;
  findStockByproductName: (name: string) => Promise<number>;
  findStockByproductId: (id: string) => Promise<number>;
  findProductsbyCategory: (category_product: string) => Promise<productget[]>;
  createProduct: (product: createProduct) => Promise<void>;
  updateProduct: (id: string, product: createProduct) => Promise<void>;
  deleteProductId: (id: string) => Promise<void>;
  findProductsByFranchise: (franchise: string) => Promise<productget[]>;
  findProductsByGender: (gender: string) => Promise<productget[]>;
  setStockProduct: (id: string, stock: number) => Promise<void>;
  setDiscountProduct: (id: string, discount: number) => Promise<void>;
  setPriceProduct: (id: string, price: number) => Promise<void>;
}
