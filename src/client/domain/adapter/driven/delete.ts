import { deleteType } from 'src/client/domain/port/driven/for-deleteClient-driven';
import { InjectClient } from 'src/client/infrastructure/Client.entity';

export class DeleteClient implements deleteType {
  constructor(private client = InjectClient) {}
  async Delete_Client(name: string, lastname: string): Promise<void> {
    await this.client.admin.delete({ name: name, lastname: lastname });
  }
}

export const Delete = new DeleteClient();
