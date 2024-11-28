import {
  FindAdmin,
  DrivenFind,
} from 'src/administrator/domain/adapter/driving';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class AdminByName {
  private method: FindAdmin;
  constructor(readonly service: adminOrm) {
    this.method = new FindAdmin(new DrivenFind(service));
  }
  public async findBy_name_lastname(name: string, lastname: string) {
    const admin = await this.method.find_Name_Lastname(name, lastname);
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
