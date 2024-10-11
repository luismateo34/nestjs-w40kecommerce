import { client } from '@/client/domain/entity/entityInterfaceClient';

export interface usecase {
  GetClient(name: string, lastname: string): Promise<client>;
  GetClientProductPurchase(name: string, lastname: string): Promise<string[]>;
  GetClientOrderPurchase(name: string, lastname: string): Promise<string[]>;
  GetClientPassword(name: string, lastname: string): Promise<string>;
  CreateClient(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void>;
  UpdateClientName(name: string, lastname: string): Promise<void>;
  UpdateClientEmail(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void>;
  UpdateClientPassword(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void>;
  DeleteClient(name: string, lastname: string): Promise<void>;
}
