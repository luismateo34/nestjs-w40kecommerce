import { usecases } from '@/product/domain/usecases/usecases';

export type findProductdriven = Pick<
  usecases,
  | 'findProductById'
  | 'findProductByName'
  | 'findStockByproductName'
  | 'findStockByproductId'
  | 'findProductsbyCategory'
  | 'findProductsByGender'
  | 'findProductsByFranchise'
>;
