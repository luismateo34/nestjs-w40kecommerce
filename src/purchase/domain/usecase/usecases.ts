import { OrderPurchase } from '../entity/entityInterfaceOrder';
export type orderCreate = Omit<OrderPurchase, 'id' | 'updatedAt' | 'createdAt'>;

export interface usecases {
  findByclient(name: string): Promise<OrderPurchase[]>;
  findByDate(date: Date): Promise<OrderPurchase[]>;
  findById(id: string): Promise<OrderPurchase>;
  findByclientandId(name: string, id: string): Promise<OrderPurchase>;
  create(order: orderCreate): Promise<void>;
  update(order: orderCreate): Promise<void>;
  updateEnvoy(id: string): Promise<void>;
  deleteOrder(id: string): Promise<void>;
}
