import { ForDeleteAdmin } from '../../port/driven/for-delete-admin';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class DrivenDelete implements ForDeleteAdmin {
  constructor(private service: adminOrm) {}
  async delete_Admin(name: string, lastname: string): Promise<void> {
    await this.service.delete(name, lastname);
  }
}
