import { SetMetadata } from '@nestjs/common';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: permissions[]) => SetMetadata(ROLES_KEY, roles);
