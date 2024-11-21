export interface deleteClientDriver {
  Delete_Client(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'>;
}
