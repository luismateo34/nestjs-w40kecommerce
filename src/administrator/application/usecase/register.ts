import {
  CreateAdministrator,
  DrivenCreate,
  DrivenFind,
} from 'src/administrator/domain/adapter/driving';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { register } from './response';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class Register {
  private create: CreateAdministrator;
  constructor(protected service: adminOrm) {
    this.create = new CreateAdministrator(
      new DrivenCreate(service),
      new DrivenFind(service),
    );
  }
  async registerMethod(Admin: admin) {
    if (
      Admin.name.length === 0 ||
      Admin.password.length === 0 ||
      Admin.lastname.length === 0
    ) {
      return register.ERRORDATA;
    }
    const resp = await this.create.createAdmin(Admin);
    return resp;
  }
}
