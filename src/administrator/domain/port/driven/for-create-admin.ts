import { admin } from 'src/administrator/domain/entity/entityAdminInterface';

export interface ForCreateAdmin {
  create_Admin(user: admin): Promise<void>;
}
