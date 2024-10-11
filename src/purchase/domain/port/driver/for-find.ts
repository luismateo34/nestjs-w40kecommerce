import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';

export interface find {
  findByclient(name: string): Promise<OrderPurchase[] | Error>;
  findByDate(date: Date): Promise<OrderPurchase[] | Error>;
  findById(id: string): Promise<OrderPurchase | Error>;
  findByIdAndClient(id: string, name: string): Promise<OrderPurchase | Error>;
}
