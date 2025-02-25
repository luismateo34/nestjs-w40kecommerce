

/*--*/
export interface product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  status: string;
  deleted_at: Date;
  stock: number;
  price: number;
  category_product: string;
  gender: string;
  percentaje_discount: number;
  franchise: string | null;
}
export type createProduct = Omit<
  product,
  'createdAt' | 'updatedAt' | 'id' | 'deleted_at'
>;
export type productget = Omit<
  product,
  'createdAt' | 'updatedAt' | 'deleted_at'
>;
