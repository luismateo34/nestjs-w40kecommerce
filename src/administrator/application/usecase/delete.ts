import { deleteMethod } from 'src/administrator/domain/adapter/driver';

export class Delete {
  static async delete(name: string, lastname: string) {
    try {
      const resp = await deleteMethod.delete_Admin(lastname, name);
      return resp;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }
}
