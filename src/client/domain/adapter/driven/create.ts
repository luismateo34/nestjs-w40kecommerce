import { createType } from '@/client/domain/port/driven/for-createClient-driven';
import { hash } from 'bcrypt';
import { InjectClient } from '@/client/infrastructure/ClientEntity';

class CreateClient implements createType {
  constructor(private client: InjectClient) {}
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

let inj: InjectClient;
export const Create = new CreateClient(inj);
