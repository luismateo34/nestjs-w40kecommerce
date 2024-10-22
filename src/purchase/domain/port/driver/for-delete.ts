export interface DeleteOrder {
  delete_Order(id: string): Promise<Error | 'success'>;
}
