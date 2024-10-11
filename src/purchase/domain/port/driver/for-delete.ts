export interface DeleteOrder {
  deleteOrder(id: string): Promise<Error | 'success'>;
}
