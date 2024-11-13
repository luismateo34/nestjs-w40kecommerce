import { productget } from '../../entity/entityInterfaceProduct';

export interface Find {
  find_Stock_Product_by_Id: (id: string) => Promise<productget>;
  find_Product_by_Name: (name: string) => Promise<productget>;
  find_Stock_productName: (name: string) => Promise<number>;
  find_Stock_productId: (id: string) => Promise<number>;
  find_Products_Category: (category_product: string) => Promise<productget[]>;
  find_Products_Franchise: (franchise: string) => Promise<productget[]>;
  find_Products_Gender: (gender: string) => Promise<productget[]>;
}
