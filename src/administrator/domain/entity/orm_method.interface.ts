import { AdminInterface } from './entityAdminInterface';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';

export interface adminOrm {
  save(user: admin): Promise<void>;
  delete(name: string, lastname: string): Promise<void>;
  findOne(name: string, lastname: string): Promise<AdminInterface>;
  findAll(): Promise<AdminInterface[]>;
  findOneBy_Name_Lastname(
    name: string,
    lastname: string,
  ): Promise<AdminInterface>;
  findOneBy_Email(email: string): Promise<AdminInterface>;
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
