import { permissions } from '@/administrator/domain/entity/entityAdminInterface';

export interface ForUpdateAdmin {
  updateEmail(email: string, lastname: string, name: string): Promise<void>;
  updatePassword(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void>;
  updatePhone(lastname: string, name: string, phone: number): Promise<void>;
  updatePermissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void>;
}
