import { hash } from 'bcrypt';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { ForUpdateAdmin } from '../../port/driven/for-update-admin';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class DrivenUpdate implements ForUpdateAdmin {
  constructor(protected service: adminOrm) {}
  async update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<void> {
    await this.service.update_Email(email, lastname, name);
  }
  async update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void> {
    const passwordHash = await hash(password, 8);
    await this.service.update_Password(lastname, name, passwordHash);
  }
  async update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<void> {
    await this.service.update_Phone(lastname, name, phone);
  }
  async update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void> {
    await this.service.update_Permissions(lastname, name, permissions);
  }
}
