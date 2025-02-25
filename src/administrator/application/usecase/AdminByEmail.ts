import {
  FindAdmin,
  DrivenFind,
} from 'src/administrator/domain/adapter/driving';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class AdminByEmail {
  private method: FindAdmin;
  constructor(readonly service: adminOrm) {
    this.method = new FindAdmin(new DrivenFind(service));
  }

  async ByEmail(email: string) {
    const admin = await this.method.find_Email(email);
    const resp = {
      name: admin.name,
      lastname: admin.lastname,
      id: admin.id,
      phone: admin.phone,
      permission: admin.permissions,
    };
    return resp;
  }
}
