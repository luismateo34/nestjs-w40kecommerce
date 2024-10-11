import { admin } from "@/administrator/domain/entity/entityAdminInterface";

export interface CreateandValidate {
  validate: (user: admin) => Promise<Error | 'success'>;
}
