import { usecases } from '@/purchase/domain/usecase/usecases';

export type findType = Pick<
  usecases,
  | 'find_Client'
  | 'find_Orders_Date'
  | 'find_Id'
  | 'find_client_Id'
  | 'find_Orders_Month'
>;
