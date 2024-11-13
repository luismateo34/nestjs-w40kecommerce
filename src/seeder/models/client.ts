import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { Factory } from 'nestjs-seeder';

export class clientSeed implements client {
  @Factory((faker) => faker.internet.email())
  email: string;

  @Factory((faker) => faker.person.lastName())
  lastname: string;

  @Factory((faker) => faker.person.firstName())
  name: string;

  @Factory((faker) => faker.internet.password())
  password: string;

  @Factory((faker) => faker.string.uuid())
  purchase_order: string[];
}
