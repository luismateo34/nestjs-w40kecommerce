import { productget } from '../../entity/entityInterfaceProduct';

export interface Find {
  find_Stock_Product_by_Id: (id: string) => Promise<productget | Error>;
  find_Product_by_Name: (name: string) => Promise<productget | Error>;
  find_Stock_productName: (name: string) => Promise<number | Error>;
  find_Stock_productId: (id: string) => Promise<number | Error>;
  find_Products_Category: (
    category_product: string,
  ) => Promise<productget[] | Error>;
  find_Products_Franchise: (franchise: string) => Promise<productget[] | Error>;
  find_Products_Gender: (gender: string) => Promise<productget[] | Error>;
}
