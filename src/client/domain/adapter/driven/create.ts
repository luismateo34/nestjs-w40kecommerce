import { createType } from 'src/client/domain/port/driven/for-createClient-driven';
import { hash } from 'bcrypt';
import { InjectClient } from 'src/client/infrastructure/Client.entity';

class CreateClient implements createType {
  constructor(private client = InjectClient) {}
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
    await this.client.admin.save(client);
  }
}

export const Create = new CreateClient();
