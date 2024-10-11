import { AdminInterface } from '@/administrator/domain/entity/entityAdminInterface';
import { AdminEntity } from '@/typeorm/adminEntity';

export interface ForFindAdmin {
  findAll(): Promise<AdminInterface[]>;
  findByNameandLastname(
    name: string,
    lastname: string,
  ): Promise<AdminEntity | Error>;
  findByEmail(email: string): Promise<AdminEntity | Error>;
  findPassword(name: string, lastname: string): Promise<string | Error>;
}
