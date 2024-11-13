import { orderCreate } from '@/purchase/domain/usecase/usecases';

export interface UpdateOrder {
  update(order: orderCreate): Promise<'success'>;
  update_Envoy(id: string): Promise<'success'>;
}
