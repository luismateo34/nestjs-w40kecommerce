export interface getClientDriver {
  Get_Client_Product_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]>;
  Get_Client_Order_Purchase(name: string, lastname: string): Promise<string[]>;
  Get_Client_Password(name: string, lastname: string): Promise<string>;
}
