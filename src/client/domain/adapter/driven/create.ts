import { createType } from 'src/client/domain/port/driven/for-createClient-driven';
import { hash } from 'bcrypt';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class CreateDriven implements createType {
  constructor(private client: ormclient) {}
  async Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void> {
    const client = {
      email: email,
      name: name,
      lastname: lastname,
      password: await hash(password, 8),
    };
    await this.client.save(
      client.email,
      client.name,
      client.lastname,
      client.password,
    );
  }
}
