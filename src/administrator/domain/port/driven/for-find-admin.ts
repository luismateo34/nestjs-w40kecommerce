import { AdminInterface } from 'src/administrator/domain/entity/entityAdminInterface';

export interface ForFindAdmin {
  find_All(): Promise<AdminInterface[]>;
  find_Name_Lastname(name: string, lastname: string): Promise<AdminInterface>;
  find_Email(email: string): Promise<AdminInterface>;
  find_Password(name: string, lastname: string): Promise<string>;
}
