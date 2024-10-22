import { hash } from 'bcrypt';
import { admin } from '@/administrator/domain/entity/entityAdminInterface';
import { ForCreateAdmin } from '../../port/driven/for-create-admin';
import { AdminInject } from '@/administrator/infrastructure/adminEntity';

class CreateAdmin implements ForCreateAdmin {
  constructor(private service: AdminInject) {}
  private saltround: 8;
  async create_Admin(user: admin) {
    const saveUser = {} as admin;
    saveUser.email = user.email;
    saveUser.permissions = user.permissions;
    saveUser.name = user.name;
    saveUser.lastname = user.lastname;
    saveUser.phone = user.phone;
    saveUser.password = await hash(user.password, this.saltround);
    await this.service.admin.save(saveUser);
  }
}

let inj: AdminInject;
export const Create = new CreateAdmin(inj);
