import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';

export interface ForUpdateAdmin {
  update_Email(email: string, lastname: string, name: string): Promise<void>;
  update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void>;
  update_Phone(lastname: string, name: string, phone: number): Promise<void>;
  update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void>;
}
