import { UpdateMethod } from 'src/administrator/domain/adapter/driver';
import { Update } from 'src/administrator/application/usecase/response';

export class UpadatePhone {
  static async update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<Update> {
    try {
      await UpdateMethod.update_Phone(lastname, name, phone);
      return Update.SUCCESS;
    } catch {
      return Update.ERROR;
    }
  }
}
