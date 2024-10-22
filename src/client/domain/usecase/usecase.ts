import { client } from '@/client/domain/entity/entityInterfaceClient';

export interface usecase {
  Get_Client(name: string, lastname: string): Promise<client>;
  Get_Client_Product_Purchase(
    name: string,
    lastname: string,
  ): Promise<string[]>;
  Get_Client_Order_Purchase(name: string, lastname: string): Promise<string[]>;
  Get_Client_Password(name: string, lastname: string): Promise<string>;
  Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void>;
  // update
  Update_Client_Name(name: string, lastname: string): Promise<void>;
  Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void>;
  Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void>;
  //delete
  Delete_Client(name: string, lastname: string): Promise<void>;
}
