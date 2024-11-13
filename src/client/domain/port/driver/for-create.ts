export interface createClientDriver {
  Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<'success'>;
}
