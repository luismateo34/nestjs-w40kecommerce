import { find } from 'src/administrator/domain/adapter/driver';
import { ErrorServer } from 'src/administrator/application/usecase/response';

export class AllAdmin {
  static async All() {
    try {
      const userFind = await find.find_All();

      const arr = userFind.map((el) => {
        return {
          name: el.name,
          lastname: el.lastname,
          email: el.email,
          id: el.id,
          permission: el.permissions,
        };
      });
      return arr;
    } catch {
      return ErrorServer.ERROR_SERVER;
    }
  }
}
