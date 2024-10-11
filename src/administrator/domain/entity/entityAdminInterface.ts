export enum permissions {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
}

export interface AdminInterface {
  name: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: permissions;
}

export type admin = Omit<
  AdminInterface,
  'id' | 'createdAt' | 'updatedAt' | 'permision'
>;
