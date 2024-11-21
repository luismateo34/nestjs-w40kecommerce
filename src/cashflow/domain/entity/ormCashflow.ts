import { cash } from 'src/cashflow/domain/entity/entityInterfaceCashflow';
export interface ormcashflow {
  update_monthly_expense: (date: Date, expenses: number) => Promise<void>;
  update_Date_monthly_balance: (
    date: Date,
    monthly_balance: number,
  ) => Promise<void>;
  update_Day_balance: (date: Date, balance_day: number) => Promise<void>;
  update_Day_expense: (date: Date, expenses: number) => Promise<void>;
  update_Day_revenue: (date: Date, revenue: number) => Promise<void>;
  update_Date_monthly_revenue: (date: Date, revenue: number) => Promise<void>;
  find_month_range: (
    first_Month_day: Date,
    last_Month_day: Date,
  ) => Promise<cash[]>;
  create_Cash_Order: (order: cash) => Promise<void>;
  findOneBydate: (date: Date) => Promise<cash>;
}
