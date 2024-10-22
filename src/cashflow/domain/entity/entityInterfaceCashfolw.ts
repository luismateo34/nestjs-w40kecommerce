export interface cash {
  date: Date;
  revenue: number | null;
  monthly_revenue: number | null;
  expenses: number | null;
  monthly_expenses: number | null;
  balance_day: number | null;
  monthly_balance: [Date, number] | null;
}
