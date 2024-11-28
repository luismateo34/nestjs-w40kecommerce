export interface createClientDriving {
  Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<'success'>;
}
