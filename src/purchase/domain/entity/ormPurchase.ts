import { OrderPurchase } from './entityInterfaceOrder';
import { orderCreate } from 'src/purchase/domain/usecase/usecases';

export interface ormPurchase {
  find_Orders_Date: (
    year: number,
    month: number,
    day: number,
  ) => Promise<OrderPurchase[]>;
  save: (order: orderCreate) => Promise<void>;
  delete: (id: string) => Promise<void>;
  find_orders_by_day: (day: Date, nextDay: Date) => Promise<OrderPurchase[]>;
  find_orders_by_month: (
    month: Date,
    nextMonth: Date,
  ) => Promise<OrderPurchase[]>;
  find_Id: (id: string) => Promise<OrderPurchase>;
  find_by_client_name: (name: string) => Promise<OrderPurchase[]>;
  update_Envoy: (id: string, envoy: boolean) => Promise<void>;
}
