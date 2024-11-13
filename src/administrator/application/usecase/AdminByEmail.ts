import { find } from 'src/administrator/domain/adapter/driver';

export class AdminByEmail {
  static async ByEmail(email: string) {
    try {
      const admin = await find.find_Email(email);
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
