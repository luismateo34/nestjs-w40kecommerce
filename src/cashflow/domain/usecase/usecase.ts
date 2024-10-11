export interface usecase {
  findBalance_day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
  findBalancebyMonth(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
  findExpensebyDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
  findRevenuebyDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
  createBalancebyMonth(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
  createBalancebyDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;

  createRevenuebyDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
  createExpensebyDay(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | null>;
}
