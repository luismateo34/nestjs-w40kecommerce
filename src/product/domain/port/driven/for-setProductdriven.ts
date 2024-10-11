import { usecases } from '@/product/domain/usecases/usecases';

export type stockProductdriven = Pick<
  usecases,
  'setStockProduct' | 'setDiscountProduct' | 'setPriceProduct'
>;
