export interface Create {
  create_Cash_Order_day(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'>;
  }
