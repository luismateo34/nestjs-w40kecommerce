export interface Delete {
  delete_ProductId: (id: string) => Promise<'success'>;
}
