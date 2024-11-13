export interface FindCash {
  find_Balance_Year_Month_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]>;
  find_Expense_Year_Month_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]>;
  find_Revenue_Year_Month_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]>;
  find_Expense_Month(year: number, month: number): Promise<[Date, number]>;
  find_Revenue_Month(year: number, month: number): Promise<[Date, number]>;
}
