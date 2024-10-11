import { AdminInterface } from '@/administrator/domain/entity/entityAdminInterface';
import { AdminEntity } from '@/typeorm/adminEntity';

export interface ForFindAdmin {
  findAll(): Promise<AdminInterface[]>;
  findByNameandLastname(name: string, lastname: string): Promise<AdminEntity>;
  findByEmail(email: string): Promise<AdminEntity>;
  findPassword(name: string, lastname: string): Promise<string>;
}
