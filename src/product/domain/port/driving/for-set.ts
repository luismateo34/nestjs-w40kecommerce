export interface Set {
  set_Stock_Product: (id: string, stock: number) => Promise<'success'>;
  set_Discount_Product: (id: string, discount: number) => Promise<'success'>;
  set_Price_Product: (id: string, price: number) => Promise<'success'>;
}
