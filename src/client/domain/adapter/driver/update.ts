import { updateClientDriver } from '@/client/domain/port/driver/for-update';
import { getclient } from '@/client/domain/port/driven/for-getClient-driven';
import { updateType } from '@/client/domain/port/driven/for-updateClient-driven';

export class Update implements updateClientDriver {
  constructor(
    private readonly method: updateType,
    private readonly getclient: getclient,
  ) {}
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<Error | 'success'> {
    const find = await this.getclient.Get_Client(name, lastname);
    if (find.name === undefined) {
      throw new Error('error no se encontro el cliente');
    }
    await this.method.Update_Client_Email(name, lastname, email);
    return 'success';
  }
  async Update_Client_Name(
    name: string,
    lastname: string,
  ): Promise<Error | 'success'> {
    const find = await this.getclient.Get_Client(name, lastname);
    if (find.name === undefined) {
      throw new Error('error no se encontro el cliente');
    }
    await this.method.Update_Client_Name(name, lastname);
    return 'success';
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<Error | 'success'> {
    const find = await this.getclient.Get_Client(name, lastname);
    if (find.name === undefined) {
      throw new Error('error no se encontro el cliente');
    }
    await this.method.Update_Client_Password(name, lastname, password);
    return 'success';
  }
}
