import { permisionString } from 'src/administrator/domain/entity/entityAdminInterface';

export interface ForUpdateAdmin {
  update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<'success'>;
  update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<'success'>;
  update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<'success'>;
  update_Permissions(
    lastname: string,
    name: string,
    permissions: permisionString,
  ): Promise<'success'>;
}
