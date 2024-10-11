import { permissions } from "@/administrator/domain/entity/entityAdminInterface";

export interface FindPermision {
  getPermision: (name: string, lastname: string) => Promise<permissions>;
}
