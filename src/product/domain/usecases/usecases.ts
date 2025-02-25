import {
  productget,
  createProduct,
  product,
} from '../entity/entityInterfaceProduct';

export interface usecases {
  find_Product_Id: (id: string) => Promise<productget>;
  find_Product_All_Id: (id: string) => Promise<product>;
  find_Product_Name: (name: string) => Promise<productget>;
  find_Stock_product_Name: (name: string) => Promise<number>;
  find_Stock_productId: (id: string) => Promise<number>;
  find_Products_Category: (category_product: string) => Promise<productget[]>;
  find_Products_Franchise: (franchise: string) => Promise<productget[]>;
  find_Products_Gender: (gender: string) => Promise<productget[]>;
  //
  create_Product: (product: createProduct) => Promise<void>;
  //
  update_Product: (id: string, product: createProduct) => Promise<void>;
  //
  delete_ProductId: (id: string) => Promise<void>;
  //
  //
  set_Stock_Product: (id: string, stock: number) => Promise<void>;
  set_Discount_Product: (id: string, discount: number) => Promise<void>;
  set_Price_Product: (id: string, price: number) => Promise<void>;
}
