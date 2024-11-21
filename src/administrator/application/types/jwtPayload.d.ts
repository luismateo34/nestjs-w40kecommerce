import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';

export interface PayloadJwt {
  name: string;
  lastname: string;
  id: string;
  role: permissions;
}
