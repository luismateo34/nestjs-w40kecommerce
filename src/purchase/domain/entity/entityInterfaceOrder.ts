export interface OrderPurchase {
  products: string[];
  date: Date;
  // name, lastname
  client: [string, string];
  amount: number;
  envoy: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
