import { admin } from 'src/administrator/domain/entity/entityAdminInterface';

export interface CreateandValidate {
  createAdmin: (user: admin) => Promise <'success'>;
}
