export interface usecase {
  find_Balance_day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]>;
  find_Balance_Month(year: number, month: number): Promise<[Date, number]>;
  find_Expense_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]>;
  find_Expense_Month(year: number, month: number): Promise<[Date, number]>;
  find_Revenue_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number]>;
  find_Revenue_Month(year: number, month: number): Promise<[Date, number]>;

  /*--create--*/
  create_Cash_Order_day(
    year: number,
    month: number,
    day: number,
  ): Promise<void>;
  /*--update--*/
  update_Balance_Month(year: number, month: number, day: number): Promise<void>;
  update_Balance_Day(year: number, month: number, day: number): Promise<void>;
  /*-------*/
  update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<void>;
  update_Revenue_Month(year: number, month: number, day: number): Promise<void>;
  /*-------*/
  update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<void>;
  update_Expense_Month(year: number, month: number, day: number): Promise<void>;
}
