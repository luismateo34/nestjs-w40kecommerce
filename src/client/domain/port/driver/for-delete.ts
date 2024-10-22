export interface deleteClientDriver {
  Delete_Client(name: string, lastname: string): Promise<Error | 'success'>;
}
