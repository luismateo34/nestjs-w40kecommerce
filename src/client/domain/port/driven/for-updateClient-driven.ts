import { usecase } from '@/client/domain/usecase/usecase';
export type updateType = Pick<
  usecase,
  'UpdateClientEmail' | 'UpdateClientPassword' | 'UpdateClientName'
>;
