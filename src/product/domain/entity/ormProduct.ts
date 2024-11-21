import {
  createProduct,
  productget,
} from 'src/product/domain/entity/entityInterfaceProduct';

export interface ormProduct {
  create: (CreateProduct: createProduct) => void;
  delete: (id: string) => Promise<void>;
  find_Product_by_Id: (id: string) => Promise<productget>;
  find_Product_Name: (name: string) => Promise<productget>;
  find_Products_Category: (category_product: string) => Promise<productget[]>;
  find_Products_Franchise: (franchise: string) => Promise<productget[]>;
  find_Products_Gender: (gender: string) => Promise<productget[]>;
  find_Stock_productId: (id: string) => Promise<number>;
  find_Stock_product_Name: (name: string) => Promise<number>;
  set_Discount_Product_update: (id: string, discount: number) => Promise<void>;
  set_Price_Product_update: (id: string, price: number) => Promise<void>;
  set_Stock_Product_update: (id: string, stock: number) => Promise<void>;
  update_Product: (id: string, product: createProduct) => Promise<void>;
}
