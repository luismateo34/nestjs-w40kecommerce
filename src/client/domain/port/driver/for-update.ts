export interface updateClientDriver {
  UpdateClientName(name: string, lastname: string): Promise<Error | 'success'>;
  UpdateClientEmail(
    name: string,
    lastname: string,
    email: string,
  ): Promise<Error | 'success'>;
  UpdateClientPassword(
    name: string,
    lastname: string,
    password: string,
  ): Promise<Error | 'success'>;
}
