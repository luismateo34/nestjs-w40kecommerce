import { permissions } from '@/administrator/domain/entity/entityAdminInterface';
import { FindPermision } from '../../port/driven/for-find-permision';
import { AdminInject } from '@/administrator/infrastructure/adminEntity';

class FindPermisionbyName implements FindPermision {
  constructor(private service: AdminInject) {}
  async get_Permision(name: string, lastname: string): Promise<permissions> {
    const adminData = await this.service.admin.findOne({
      where: { name: name, lastname: lastname },
    });
    return adminData.permissions;
  }
}
let inj: AdminInject;
export const findPermision = new FindPermisionbyName(inj);
