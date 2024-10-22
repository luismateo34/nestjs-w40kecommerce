import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';

export interface find {
  find_Client(name: string): Promise<OrderPurchase[] | Error>;
  find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[] | Error>;
  find_Orders_Month(
    year: number,
    month: number,
  ): Promise<OrderPurchase[] | Error>;
  find_Id(id: string): Promise<OrderPurchase | Error>;
  find_Id_Client(id: string, name: string): Promise<OrderPurchase | Error>;
}
