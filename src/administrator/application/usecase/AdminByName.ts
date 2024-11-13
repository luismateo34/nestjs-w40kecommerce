import { find } from 'src/administrator/domain/adapter/driver';

export class AdminByName {
  static async find(name: string, lastname: string) {
    try {
      const admin = await find.find_Name_Lastname(name, lastname);
      const resp = {
        name: admin.name,
        lastname: admin.lastname,
        id: admin.id,
        phone: admin.phone,
        permission: admin.permissions,
      };
      return resp;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }
}
