import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';

export interface FindPermision {
  get_Permision: (name: string, lastname: string) => Promise<permissions>;
}
