import { deleteType } from '@/client/domain/port/driven/for-deleteClient-driven';
import { InjectClient } from '@/client/infrastructure/ClientEntity';

export class DeleteClient implements deleteType {
  constructor(private client: InjectClient) {}
  async Delete_Client(name: string, lastname: string): Promise<void> {
    await this.client.admin.delete({ name: name, lastname: lastname });
  }
}

let inj: InjectClient;
export const Delete = new DeleteClient(inj);
