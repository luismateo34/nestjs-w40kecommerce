import { OrderPurchase } from '../entity/entityInterfaceOrder';
export type orderCreate = Omit<OrderPurchase, 'updatedAt' | 'createdAt' | 'id'>;

export interface usecases {
  find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]>;
  find_Orders_Month(year: number, month: number): Promise<OrderPurchase[]>;
  find_by_Id(id: string): Promise<OrderPurchase | null>;
  find_by_clientId(id: string): Promise<OrderPurchase[] | []>;
  create(order: orderCreate): Promise<OrderPurchase>;
  update(order: orderCreate): Promise<OrderPurchase>;
  update_Envoy(id: string): Promise<void>;
  delete_Order(id: string): Promise<void>;
}
