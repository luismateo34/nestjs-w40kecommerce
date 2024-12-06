import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { product } from 'src/product/domain/entity/entityInterfaceProduct';
export interface OrderPurchase {
  products: product[];

  client: client;
  // monto de pago
  amount: number;
  // envio
  envoy: boolean | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
