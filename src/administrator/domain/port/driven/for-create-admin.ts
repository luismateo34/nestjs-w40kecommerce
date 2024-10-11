import { admin } from '@/administrator/domain/entity/entityAdminInterface';

export interface ForCreateAdmin {
  createAdmin(user: admin): Promise<void>;
}
