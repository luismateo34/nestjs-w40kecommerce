import { orderCreate } from '@/purchase/domain/usecase/usecases';

export interface UpdateOrder {
  update(order: orderCreate): Promise<Error | 'success'>;
  update_Envoy(id: string): Promise<Error | 'success'>;
}
