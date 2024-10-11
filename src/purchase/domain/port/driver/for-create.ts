import { orderCreate } from '@/purchase/domain/usecase/usecases';
export interface CreateOrder {
  create(orderType: orderCreate): Promise<Error | 'success'>;
}
