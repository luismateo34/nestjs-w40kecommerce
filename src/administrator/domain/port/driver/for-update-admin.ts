import { permissions } from '@/administrator/domain/entity/entityAdminInterface';

export interface ForUpdateAdmin {
  update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<Error | 'success'>;
  update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<Error | 'success'>;
  update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<Error | 'success'>;
  update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<Error | 'success'>;
}
