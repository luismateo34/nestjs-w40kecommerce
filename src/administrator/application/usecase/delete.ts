import {
  Delete as deleteclass,
  DrivenDelete,
} from 'src/administrator/domain/adapter/driving';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class Delete {
  private method: deleteclass;
  constructor(protected service: adminOrm) {
    this.method = new deleteclass(new DrivenDelete(service));
  }
  async delete(name: string, lastname: string) {
    const resp = await this.method.delete_Admin(lastname, name);
    return resp;
  }
}
