import { usecase } from '@/client/domain/usecase/usecase';
export type updateType = Pick<
  usecase,
  | 'Update_Client_Email'
  | 'Update_Client_Password'
  | 'Update_Client_Name'
  | 'Update_Purchase_orders'
>;
