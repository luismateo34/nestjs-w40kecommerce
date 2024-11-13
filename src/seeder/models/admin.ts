import {
  admin,
  permissions,
} from 'src/administrator/domain/entity/entityAdminInterface';
import { Factory } from 'nestjs-seeder';

export class AdminSeed implements admin {
  @Factory((faker) => faker.internet.email())
  email: string;

  @Factory((faker) => faker.person.lastName())
  lastname: string;

  @Factory((faker) => faker.person.firstName())
  name: string;

  @Factory((faker) => faker.internet.password())
  password: string;

  @Factory((faker) => faker.phone.number())
  phone: number;

  @Factory((faker) => faker.helpers.enumValue(permissions))
  permissions: permissions;
}
