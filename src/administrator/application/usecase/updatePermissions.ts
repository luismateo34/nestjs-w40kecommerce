import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { Update as updateResponse } from 'src/administrator/application/usecase/response';
import { DrivenUpdate, Update } from 'src/administrator/domain/adapter/driving';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class UpadatePermissions {
  private method: Update;
  constructor(readonly service: adminOrm) {
    this.method = new Update(new DrivenUpdate(service));
  }
  async update_Permisions(
    permissions: permissions,
    lastname: string,
    name: string,
  ): Promise<updateResponse> {
    await this.method.update_Permissions(lastname, name, permissions);
    return updateResponse.SUCCESS;
  }
}
