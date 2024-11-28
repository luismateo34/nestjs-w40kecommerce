import {
  DeleteDriven,
  deleteDriving,
  FindDriven,
} from 'src/client/domain/adapter/driving';
import { deleteClientDriving } from 'src/client/domain/port/driving/for-delete';
import { ormclient } from 'src/client/domain/entity/ormclient';

export class deleteMethod implements deleteClientDriving {
  private service: deleteDriving;
  constructor(readonly database: ormclient) {
    this.service = new deleteDriving(
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
