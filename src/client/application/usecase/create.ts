import {
  CreateClientDriving,
  CreateDriven,
} from 'src/client/domain/adapter/driving';
import { createClientDriving as createPort } from 'src/client/domain/port/driving/for-create';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class CreateMethod implements createPort {
  private sevice: CreateClientDriving;
  constructor(readonly database: ormclient) {
    this.sevice = new CreateClientDriving(new CreateDriven(database));
  }
  async Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<'success'> {
    return await this.sevice.Create_Client(name, lastname, password, email);
  }
}
