import { ForDeleteAdmin } from '../../port/driven/for-delete-admin';
import { AdminInject } from 'src/administrator/infrastructure/admin.entity';

class Delete implements ForDeleteAdmin {
  constructor(private service = AdminInject) {}
  async delete_Admin(name: string, lastname: string): Promise<void> {
    await this.service.admin.delete({ name: name, lastname: lastname });
  }
}
export const DeleteService = new Delete();
