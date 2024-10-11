export interface createClientDriver {
  CreateClient(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<Error | 'success'>;
}
