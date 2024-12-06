import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
export interface client {
  name: string;
  lastname: string;
  password: string;
  email: string;
  purchase_order: OrderPurchase[] | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
