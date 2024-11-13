import { find } from 'src/administrator/domain/adapter/driver';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { responsefind } from './response';

export class Authorized {
  static async authLogin(
    name: string,
    lastname: string,
  ): Promise<responsefind.ERROR_SERVER | responsefind.NOT_FOUND | permissions> {
    try {
      const userFind = await find.find_Name_Lastname(name, lastname);
      if (userFind.name === undefined || userFind.name.length === 0) {
        return responsefind.NOT_FOUND;
      }

      return userFind.permissions;
    } catch {
      return responsefind.ERROR_SERVER;
    }
  }
  static async authVerified(
    name: string,
    lastname: string,
    id: string,
  ): Promise<responsefind.ERROR_SERVER | responsefind.NOT_FOUND | permissions> {
    try {
      const userFind = await find.find_Name_Lastname(name, lastname);
      if (
        userFind.name === undefined ||
        userFind.name.length === 0 ||
        id !== userFind.id
      ) {
        return responsefind.NOT_FOUND;
      }

      return userFind.permissions;
    } catch {
      return responsefind.ERROR_SERVER;
    }
  }
}
