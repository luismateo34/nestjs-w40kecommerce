export interface Set {
  setStockProduct: (id: string, stock: number) => Promise<Error | 'success'>;
  setDiscountProduct: (
    id: string,
    discount: number,
  ) => Promise<Error | 'success'>;
  setPriceProduct: (id: string, price: number) => Promise<Error | 'success'>;
}
