import { deleteType } from 'src/client/domain/port/driven/for-deleteClient-driven';
import { compare } from 'bcrypt';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class DeleteDriven implements deleteType {
  constructor(private client: ormclient) {}
  async Delete_Client(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    const resp = await this.client.get_by_name_lastname(name, lastname);
    const isValid = compare(password, resp.password);

    if (!isValid) {
      throw new Error();
    }
    await this.client.delete(name, lastname);
  }
}
