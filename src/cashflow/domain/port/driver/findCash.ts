export interface FindCash {
  findBalancebyYearAndMonthAndDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | Error>;
  findExpensebyYearandMonthandDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | Error>;
  findRevenuebyYearandMonthandDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | Error>;
}
