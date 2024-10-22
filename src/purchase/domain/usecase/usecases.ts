import { OrderPurchase } from '../entity/entityInterfaceOrder';
export type orderCreate = Omit<OrderPurchase, 'id' | 'updatedAt' | 'createdAt'>;

export interface usecases {
  find_Client(name: string): Promise<OrderPurchase[]>;
  find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]>;
  find_Orders_Month(year: number, month: number): Promise<OrderPurchase[]>;
  find_Id(id: string): Promise<OrderPurchase>;
  find_client_Id(name: string, id: string): Promise<OrderPurchase>;
  create(order: orderCreate): Promise<void>;
  update(order: orderCreate): Promise<void>;
  update_Envoy(id: string): Promise<void>;
  delete_Order(id: string): Promise<void>;
}
