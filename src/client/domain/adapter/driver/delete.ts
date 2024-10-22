import { deleteClientDriver } from '@/client/domain/port/driver/for-delete';
import { deleteType } from '@/client/domain/port/driven/for-deleteClient-driven';
import { getclient } from '@/client/domain/port/driven/for-getClient-driven';

export class Delete implements deleteClientDriver {
  constructor(
    private readonly getclient: getclient,
    private readonly deleteMethod: deleteType,
  ) {}
  async Delete_Client(
    name: string,
    lastname: string,
  ): Promise<Error | 'success'> {
    const findClient = await this.getclient.Get_Client(name, lastname);
    if (findClient.name === undefined) {
      throw new Error('operacion no realizada, usuario ninexistente');
    }
    await this.deleteMethod.Delete_Client(name, lastname);
    return 'success';
  }
}
