import { hash } from 'bcrypt';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { ForCreateAdmin } from '../../port/driven/for-create-admin';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class DrivenCreate implements ForCreateAdmin {
  constructor(private service: adminOrm) {}
  private saltround: 8;
  async create_Admin(user: admin): Promise<void> {
    const saveUser = {} as admin;
    saveUser.email = user.email;
    saveUser.permissions = user.permissions;
    saveUser.name = user.name;
    saveUser.lastname = user.lastname;
    saveUser.phone = user.phone;
    saveUser.password = await hash(user.password, this.saltround);
    await this.service.save(saveUser);
  }
}
