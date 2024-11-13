import { updateType } from 'src/client/domain/port/driven/for-updateClient-driven';
import { hash } from 'bcrypt';
import { InjectClient } from 'src/client/infrastructure/Client.entity';

class UpdateClient implements updateType {
  constructor(private client = InjectClient) {}
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void> {
    await this.client.admin.update(
      { name: name, lastname: lastname },
      { email: email },
    );
  }
  async Update_Client_Name(name: string, lastname: string): Promise<void> {
    await this.client.admin.update(
      { name: name, lastname: lastname },
      { name: name, lastname: lastname },
    );
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    await this.client.admin.update(
      { name: name, lastname: lastname },
      { password: await hash(password, 8) },
    );
  }
}
export const Update = new UpdateClient();
