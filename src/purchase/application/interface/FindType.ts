import { string_month_spanish } from 'src/cashflow/application/month/month';
import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';
import { find } from 'src/purchase/domain/port/driving/for-find';

type findType = Omit<find, 'find_Orders_Date' | 'find_Orders_Month'>;
export interface dateFind extends findType {
  find_Orders_Date: (
    day: number,
    year: number,
    month: string_month_spanish,
  ) => Promise<OrderPurchase[]>;
  find_Orders_Month: (
    month: string_month_spanish,
    year: number,
  ) => Promise<OrderPurchase[]>;
}
