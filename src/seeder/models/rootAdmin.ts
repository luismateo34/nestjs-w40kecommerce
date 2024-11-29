import {
  admin,
  permissions,
} from 'src/administrator/domain/entity/entityAdminInterface';
import { hashSync } from 'bcrypt';
import { Factory } from 'nestjs-seeder';

export class RootSeed implements admin {
  @Factory('gatogordo@gmail.com')
  email: string;

  @Factory('piñeiro')
  lastname: string;

  @Factory('luis')
  name: string;

  @Factory(hashSync('luismateo129', 10))
  password: string;

  @Factory(222 - 3422 - 6241)
  phone: number;

  @Factory(permissions.SUPERADMIN)
  permissions: permissions;
}
