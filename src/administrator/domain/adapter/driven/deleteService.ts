import { ForDeleteAdmin } from '../../port/driven/for-delete-admin';
import { AdminInject } from '@/administrator/infrastructure/adminEntity';

class Delete implements ForDeleteAdmin {
  constructor(private service: AdminInject) {}
  async delete_Admin(name: string, lastname: string): Promise<void> {
    await this.service.admin.delete({ name: name, lastname: lastname });
  }
}
let inj: AdminInject;
export const DeleteService = new Delete(inj);
