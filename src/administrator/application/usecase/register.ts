import { CreateMethod, find } from 'src/administrator/domain/adapter/driver';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { register } from './response';

export class Register {
  static async registerMethod(Admin: admin) {
    try {
      const userfind = await find.find_Name_Lastname(
        Admin.name,
        Admin.lastname,
      );
      if (userfind.name.length === 0 || userfind.lastname.length === 0) {
        return register.NOT_FOUND;
      }
      const resp = await CreateMethod.createAdmin(Admin);
      if (typeof resp === 'string') {
        return register.SUCCESS;
      }
    } catch (e) {
      if (e instanceof Error) {
        return register.ERROR;
      }
    }
  }
}
