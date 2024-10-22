import { usecases } from '@/product/domain/usecases/usecases';

export type findProductdriven = Pick<
  usecases,
  | 'find_Product_Id'
  | 'find_Product_Name'
  | 'find_Stock_product_Name'
  | 'find_Stock_productId'
  | 'find_Products_Category'
  | 'find_Products_Gender'
  | 'find_Products_Franchise'
>;
