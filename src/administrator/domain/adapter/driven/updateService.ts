import { hash } from 'bcrypt';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { ForUpdateAdmin } from '../../port/driven/for-update-admin';
import { AdminInject } from 'src/administrator/infrastructure/admin.entity';

class UpdateService implements ForUpdateAdmin {
  constructor(private service = AdminInject) {}
  async update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<void> {
    await this.service.admin.update(
      { name: name, lastname: lastname },
      {
        email: email,
      },
    );
  }
  async update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void> {
    const passwordHash = await hash(password, 8);
    await this.service.admin.update(
      { name: name, lastname: lastname },
      {
        password: passwordHash,
      },
    );
  }
  async update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<void> {
    await this.service.admin.update(
      { name: name, lastname: lastname },
      {
        phone: phone,
      },
    );
  }
  async update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void> {
    await this.service.admin.update(
      { name: name, lastname: lastname },
      {
        permissions: permissions,
      },
    );
  }
}

export const Update = new UpdateService();
