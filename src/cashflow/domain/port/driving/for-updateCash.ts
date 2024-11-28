export interface updateDriver {
  update_Balance_Month(
    year: number,
    month: number,
  ): Promise<'success'>;
  update_Balance_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<'success'>;
  update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<'success'>;
  update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<'success'>;
  update_Revenue_Month(
    year: number,
    month: number,
  ): Promise<'success'>;
  update_Expense_Month(
    year: number,
    month: number,
  ): Promise<'success'>;
}
