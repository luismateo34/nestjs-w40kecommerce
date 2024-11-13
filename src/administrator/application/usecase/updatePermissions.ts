import { UpdateMethod } from 'src/administrator/domain/adapter/driver';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { Update } from 'src/administrator/application/usecase/response';

export class UpadatePermissions {
  static async update_Permisions(
    permissions: permissions,
    lastname: string,
    name: string,
  ): Promise<Update> {
    try {
      await UpdateMethod.update_Permissions(lastname, name, permissions);
      return Update.SUCCESS;
    } catch {
      return Update.ERROR;
    }
  }
}
