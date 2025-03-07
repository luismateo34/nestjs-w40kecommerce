import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
export interface CreateOrder {
  create(orderType: orderCreate): Promise<OrderPurchase>;
}
