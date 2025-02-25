import { usecases } from 'src/product/domain/usecases/usecases';

export type stockProductdriven = Pick<
  usecases,
  'set_Stock_Product' | 'set_Discount_Product' | 'set_Price_Product'
>;
