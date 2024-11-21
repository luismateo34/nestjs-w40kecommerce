import {
  CreateClientDriver,
  CreateDriven,
} from 'src/client/domain/adapter/driver';
import { createClientDriver as createPort } from 'src/client/domain/port/driver/for-create';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class CreateMethod implements createPort {
  private sevice: CreateClientDriver;
  constructor(readonly database: ormclient) {
    this.sevice = new CreateClientDriver(new CreateDriven(database));
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
