import { permissions } from '@/administrator/domain/entity/entityAdminInterface';

export interface ForUpdateAdmin {
  updateEmail(
    email: string,
    lastname: string,
    name: string,
  ): Promise<Error | 'success'>;
  updatePassword(
    lastname: string,
    name: string,
    password: string,
  ): Promise<Error | 'success'>;
  updatePhone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<Error | 'success'>;
  updatePermissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<Error | 'success'>;
}
