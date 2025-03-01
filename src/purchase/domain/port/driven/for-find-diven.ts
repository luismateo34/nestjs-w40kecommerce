import { usecases } from 'src/purchase/domain/usecase/usecases';

export type findType = Pick<
  usecases,
  'find_Orders_Date' | 'find_Orders_Month' | 'find_by_Id' | 'find_by_clientId'
>;
