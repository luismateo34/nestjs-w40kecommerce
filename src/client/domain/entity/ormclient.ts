import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { purchase as OrderPurchase } from 'src/client/domain/type/purchase';

export interface ormclient {
  save: (
    name: string,
    lastname: string,
    password: string,
    email: string,
  ) => Promise<void>;
  delete: (name: string, lastname: string) => Promise<void>;
  get_by_name_lastname: (name: string, lastname: string) => Promise<client>;
  get_by_id: (id: string) => Promise<client>;
  Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void>;
  Update_Client_Name(name: string, lastname: string): Promise<void>;
  Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void>;
  update_purchase_orders(id: string, order: OrderPurchase[]): Promise<void>;
}
