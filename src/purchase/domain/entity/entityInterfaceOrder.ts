export interface OrderPurchase {
  products: string[];
  date: Date;
  // name, lastname
  client:  string [];
  // monto de pago
  amount: number;
  // envio
  envoy: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
