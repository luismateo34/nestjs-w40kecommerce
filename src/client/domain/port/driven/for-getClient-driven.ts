import { usecase } from '@/client/domain/usecase/usecase';

export type getclient = Pick<
  usecase,
  'GetClient' | 'GetClientOrderPurchase' | 'GetClientPassword'
>;
