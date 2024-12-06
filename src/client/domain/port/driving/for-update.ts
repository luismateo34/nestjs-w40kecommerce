export interface updateClientDriving {
  Update_Client_Name(name: string, lastname: string): Promise<'success'>;
  Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<'success'>;
  Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'>;
  Update_Purchase_orders(id: string, order: string[]): Promise<void>;
}
