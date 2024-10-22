import { usecase } from '@/client/domain/usecase/usecase';

export type getclient = Pick<
  usecase,
  'Get_Client' | 'Get_Client_Order_Purchase' | 'Get_Client_Password'
>;
