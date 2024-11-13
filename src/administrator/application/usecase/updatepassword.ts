import { UpdateMethod } from 'src/administrator/domain/adapter/driver';
import { Update } from 'src/administrator/application/usecase/response';

export class UpadatePassword {
  static async update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<Update> {
    try {
      await UpdateMethod.update_Password(lastname, name, password);
      return Update.SUCCESS;
    } catch {
      Update.ERROR;
    }
  }
}
