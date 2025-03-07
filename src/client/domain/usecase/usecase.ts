import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { purchase as OrderPurchase } from 'src/client/domain/type/purchase';
export interface usecase {
  Get_Client(name: string, lastname: string): Promise<client>;
  Get_Client_Order_Purchase(id: string): Promise<OrderPurchase[]>;
  Get_Client_by_Id(id: string): Promise<client>;
  /*----*/
  Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void>;
  // update
  Update_Purchase_orders(id: string, order: OrderPurchase[]): Promise<void>;
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
  Delete_Client(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void>;
}
