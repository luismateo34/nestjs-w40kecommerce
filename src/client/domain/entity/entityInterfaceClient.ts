export interface client {
  name: string;
  lastname: string;
  password: string;
  email: string;
  purchase_order: string[] | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
