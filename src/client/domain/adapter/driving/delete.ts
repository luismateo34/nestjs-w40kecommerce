import { deleteClientDriving } from 'src/client/domain/port/driving/for-delete';
import { deleteType } from 'src/client/domain/port/driven/for-deleteClient-driven';
import { getclient } from 'src/client/domain/port/driven/for-getClient-driven';

export class Delete implements deleteClientDriving {
  constructor(
    private readonly getclient: getclient,
    private readonly deleteMethod: deleteType,
  ) {}
  async Delete_Client(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'> {
    const findClient = await this.getclient.Get_Client(name, lastname);
    if (findClient.name === undefined) {
      throw new Error('operacion no realizada, usuario ninexistente');
    }
    await this.deleteMethod.Delete_Client(name, lastname, password);
    return 'success';
  }
}
