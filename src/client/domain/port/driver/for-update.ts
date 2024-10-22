export interface updateClientDriver {
  Update_Client_Name(name: string, lastname: string): Promise<Error | 'success'>;
  Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<Error | 'success'>;
  Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<Error | 'success'>;
}
