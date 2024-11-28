export interface deleteClientDriving {
  Delete_Client(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'>;
}
