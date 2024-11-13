import { UpdateMethod } from 'src/administrator/domain/adapter/driver';
import { Update } from 'src/administrator/application/usecase/response';

export class UpadateEmail {
  static async update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<Update> {
    try {
      await UpdateMethod.update_Email(email, lastname, name);
      return Update.SUCCESS;
    } catch {
      return Update.ERROR;
    }
  }
}
