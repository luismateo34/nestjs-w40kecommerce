import { usecases } from '@/purchase/domain/usecase/usecases';

export type finfType = Pick<
  usecases,
  'findByclient' | 'findByDate' | 'findById' | 'findByclientandId'
>;
