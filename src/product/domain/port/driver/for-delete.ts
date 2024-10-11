export interface Delete {
  deleteProductId: (id: string) => Promise<Error | 'success'>;
}
