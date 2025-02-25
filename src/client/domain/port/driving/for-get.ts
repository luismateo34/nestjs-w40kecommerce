import { client } from '../../entity/entityInterfaceClient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

export interface getClientDriving {
  Get_Client_Order_Purchase(id: string): Promise<OrderPurchase[]>;
  Get_Client(name: string, lastname: string): Promise<client>;
  Get_Client_Id(id: string): Promise<client>;
}
