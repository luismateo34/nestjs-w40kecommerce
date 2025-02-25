import { hash } from 'bcrypt';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';
import { ForCreateAdmin } from 'src/administrator/domain/port/driven/for-create-admin';

export class DrivenCreate implements ForCreateAdmin {
  constructor(private service: adminOrm) {}
  async create_Admin(user: admin): Promise<void> {
    const saveUser = {} as admin;
    saveUser.email = user.email;
    saveUser.permissions = user.permissions;
    saveUser.name = user.name;
    saveUser.lastname = user.lastname;
    saveUser.phone = user.phone;
    saveUser.password = await hash(user.password, 8);
    await this.service.save(saveUser);
  }
}
