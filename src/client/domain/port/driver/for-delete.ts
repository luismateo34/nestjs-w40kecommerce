export interface deleteClientDriver {
  DeleteClient(name: string, lastname: string): Promise<Error | 'success'>;
}
