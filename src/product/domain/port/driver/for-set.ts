export interface Set {
  set_Stock_Product: (id: string, stock: number) => Promise<Error | 'success'>;
  set_Discount_Product: (
    id: string,
    discount: number,
  ) => Promise<Error | 'success'>;
  set_Price_Product: (id: string, price: number) => Promise<Error | 'success'>;
}
