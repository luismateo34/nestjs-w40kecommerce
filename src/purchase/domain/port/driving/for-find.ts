import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export interface find {
  find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]>;
  find_Orders_Month(year: number, month: number): Promise<OrderPurchase[]>;
  find_by_Id(id: string): Promise<OrderPurchase | null>;
  find_by_ClientId(id: string): Promise<OrderPurchase[] | []>;
}
