import {
  Updatedriven,
  updateDriver,
  FindDriven,
} from 'src/client/domain/adapter/driver';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { updateClientDriver } from 'src/client/domain/port/driver/for-update';

export class UpdateMethod implements updateClientDriver {
  private service: updateDriver;
  constructor(readonly database: ormclient) {
    this.service = new updateDriver(
      new Updatedriven(database),
      new FindDriven(database),
    );
  }
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<'success'> {
    return await this.service.Update_Client_Email(name, lastname, email);
  }
  async Update_Client_Name(name: string, lastname: string): Promise<'success'> {
    return await this.service.Update_Client_Name(name, lastname);
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'> {
    return await this.service.Update_Client_Password(name, lastname, password);
  }
}
