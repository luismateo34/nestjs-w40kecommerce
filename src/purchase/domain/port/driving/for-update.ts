import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';

export interface UpdateOrder {
  update(order: orderCreate): Promise<OrderPurchase>;
  update_Envoy(id: string): Promise<'success'>;
}
