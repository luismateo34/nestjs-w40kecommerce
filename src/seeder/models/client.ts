import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { purchase as OrderPurchase } from 'src/client/domain/type/purchase';
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

  @Factory((faker) => [faker.string.uuid()])
  purchase_order: OrderPurchase[];

  @Factory(new Date())
  createdAt: Date;

  @Factory((faker) => faker.string.uuid())
  id: string;

  @Factory(new Date())
  updatedAt: Date;
}
