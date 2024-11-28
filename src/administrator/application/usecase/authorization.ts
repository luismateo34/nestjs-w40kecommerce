import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { FindAdmin, DrivenFind } from 'src/administrator/domain/adapter/driving';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';
import { responsefind } from './response';

export class Authorized {
  private method: FindAdmin;
  constructor(readonly service: adminOrm) {
    this.method = new FindAdmin(new DrivenFind(service));
  }

  async authLogin(
    name: string,
    lastname: string,
  ): Promise<responsefind.ERROR_SERVER | responsefind.NOT_FOUND | permissions> {
    try {
      const userFind = await this.method.find_Name_Lastname(name, lastname);
      if (userFind.name === undefined || userFind.name.length === 0) {
        return responsefind.NOT_FOUND;
      }

      return userFind.permissions;
    } catch {
      return responsefind.ERROR_SERVER;
    }
  }
  async authVerified(
    name: string,
    lastname: string,
    id: string,
  ): Promise<responsefind.ERROR_SERVER | responsefind.NOT_FOUND | permissions> {
    try {
      const userFind = await this.method.find_Name_Lastname(name, lastname);
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
