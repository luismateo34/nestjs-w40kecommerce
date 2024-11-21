import {
  CreateAdministrator,
  DrivenFind,
  FindAdmin,
} from 'src/administrator/domain/adapter/driver';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { register } from './response';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class Register {
  private find: FindAdmin;
  constructor(
    protected service: adminOrm,
    protected method: CreateAdministrator,
  ) {
    this.find = new FindAdmin(new DrivenFind(service));
  }
  async registerMethod(Admin: admin) {
    const userfind = await this.find.find_Name_Lastname(
      Admin.name,
      Admin.lastname,
    );
    if (userfind.name.length === 0 || userfind.lastname.length === 0) {
      return register.NOT_FOUND;
    }
    const resp = await this.method.createAdmin(Admin);
    if (typeof resp === 'string') {
      return register.SUCCESS;
    }
  }
}
