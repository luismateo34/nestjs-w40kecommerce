import { ForFindAdmin } from '../../port/driven/for-find-admin';
import { AdminInterface } from 'src/administrator/domain/entity/entityAdminInterface';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class DrivenFind implements ForFindAdmin {
  constructor(private service: adminOrm) {}
  async find_All() {
    return await this.service.findAll();
  }
  async find_Name_Lastname(
    name: string,
    lastname: string,
  ): Promise<AdminInterface> {
    const resp = await this.service.findOneBy_Name_Lastname(name, lastname);
    return resp;
  }

  async find_Email(email: string): Promise<AdminInterface> {
    return await this.service.findOneBy_Email(email);
  }
  async find_Password(name: string, lastname: string): Promise<string> {
    const date = await this.service.findOne_Password(name, lastname);
    return date;
  }
}
