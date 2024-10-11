import { client } from '../../entity/entityInterfaceClient';

export interface getClientDriver {
  GetClientAll(name: string, lastname: string): Promise<client | Error>;
  GetClientProductPurchase(
    name: string,
    lastname: string,
  ): Promise<string[] | Error>;
  GetClientOrderPurchase(
    name: string,
    lastname: string,
  ): Promise<string[] | Error>;
  GetClientPassword(name: string, lastname: string): Promise<string | Error>;
}
