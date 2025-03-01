import { OrderPurchase } from './entityInterfaceOrder';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';

export interface ormPurchase {
  find_Orders_Date: (
    year: number,
    month: number,
    day: number,
  ) => Promise<OrderPurchase[]>;
  find_orders_by_day: (day: Date, nextDay: Date) => Promise<OrderPurchase[]>;
  find_orders_by_month: (
    month: Date,
    nextMonth: Date,
  ) => Promise<OrderPurchase[]>;
  find_Id: (id: string) => Promise<OrderPurchase | null>;
  find_by_clientId: (clientId: string) => Promise<OrderPurchase[] | []>;
  //-----------------------------------------------------------------
  update_Envoy: (id: string, envoy: boolean) => Promise<void>;
  //-----------------------------------------------------------------
  save: (order: orderCreate) => Promise<OrderPurchase>;
  //-----------------------------------------------------------------
  delete: (id: string) => Promise<void>;
}
