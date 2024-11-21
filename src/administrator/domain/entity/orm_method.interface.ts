import { AdminEntity } from '@/administrator/infrastructure/admin.entity';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';

export interface adminOrm {
  save(user: admin): Promise<void>;
  delete(name: string, lastname: string): Promise<void>;
  findOne(name: string, lastname: string): Promise<AdminEntity>;
  findAll(): Promise<AdminEntity[]>;
  findOneBy_Name_Lastname(name: string, lastname: string): Promise<AdminEntity>;
  findOneBy_Email(email: string): Promise<AdminEntity>;
  findOne_Password(name: string, lastname: string): Promise<string>;
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
