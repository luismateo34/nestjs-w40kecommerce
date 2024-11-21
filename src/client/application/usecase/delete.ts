import {
  DeleteDriven,
  deleteDriver,
  FindDriven,
} from 'src/client/domain/adapter/driver';
import { deleteClientDriver } from 'src/client/domain/port/driver/for-delete';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class deleteMethod implements deleteClientDriver {
  private service: deleteDriver;
  constructor(readonly database: ormclient) {
    this.service = new deleteDriver(
      new FindDriven(database),
      new DeleteDriven(database),
    );
  }
  async Delete_Client(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'> {
    return await this.service.Delete_Client(name, lastname, password);
  }
}
