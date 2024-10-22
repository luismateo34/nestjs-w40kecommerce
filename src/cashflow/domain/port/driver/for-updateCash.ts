export interface updateDriver {
  update_Balance_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'>;
  update_Balance_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'>;
  update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<Error | 'success'>;
  update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<Error | 'success'>;
  update_Revenue_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'>;
  update_Expense_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'>;
}
