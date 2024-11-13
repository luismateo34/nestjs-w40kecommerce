import {
  admin,
  permissions,
} from 'src/administrator/domain/entity/entityAdminInterface';
import { hashSync } from 'bcrypt';

export class RootSeed implements admin {
  email: string = 'gatogordo@gmail.com';

  lastname: string = 'piñeiro';

  name: string = 'luis';

  password: string = hashSync('luismateo129', 10);

  phone: number = 222 - 3422 - 6241;

  permissions: permissions = permissions.SUPERADMIN;
}
