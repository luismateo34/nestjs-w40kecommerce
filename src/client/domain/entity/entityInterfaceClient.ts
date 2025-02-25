import { purchase as OrderPurchase } from 'src/client/domain/type/purchase';
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
