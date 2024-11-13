import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';

export interface find {
  find_Client(name: string): Promise<OrderPurchase[]>;
  find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]>;
  find_Orders_Month(year: number, month: number): Promise<OrderPurchase[]>;
  find_Id(id: string): Promise<OrderPurchase>;
  find_Id_Client(id: string, name: string): Promise<OrderPurchase>;
}
