import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { FindPermision } from '../../port/driven/for-find-permision';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class DrivenfindPermision implements FindPermision {
  constructor(private service: adminOrm) {}
  async get_Permision(name: string, lastname: string): Promise<permissions> {
    const adminData = await this.service.findOne(name, lastname);
    return adminData.permissions;
  }
}
