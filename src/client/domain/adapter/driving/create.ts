import { createClientDriving } from 'src/client/domain/port/driving/for-create';
import { createType } from 'src/client/domain/port/driven/for-createClient-driven';

export class CreateClientDriving implements createClientDriving {
  constructor(private method: createType) {}
  async Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<'success'> {

    await this.method.Create_Client(name, lastname, password, email);
    return 'success';
  }
}
