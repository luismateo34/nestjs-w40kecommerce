import { AdminInterface } from '@/administrator/domain/entity/entityAdminInterface';
import { AdminEntity } from '@/administrator/infrastructure/adminEntity';

export interface ForFindAdmin {
  find_All(): Promise<AdminInterface[]>;
  find_Name_Lastname(name: string, lastname: string): Promise<AdminEntity>;
  find_Email(email: string): Promise<AdminEntity>;
  find_Password(name: string, lastname: string): Promise<string>;
}
