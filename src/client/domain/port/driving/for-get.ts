import { client } from '../../entity/entityInterfaceClient';

export interface getClientDriving {
  Get_Client_Order_Purchase(id: string): Promise<string[]>;
  Get_Client(name: string, lastname: string): Promise<client>;
  Get_Client_Id(id: string): Promise<client>;
}
