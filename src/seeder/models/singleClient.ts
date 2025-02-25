import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { purchase as OrderPurchase } from 'src/client/domain/type/purchase';
import { Factory } from 'nestjs-seeder';
import { hashSync } from 'bcrypt';

export class singleclientSeed implements client {
  @Factory('gatogordo_naranja@gmail.com')
  email: string;

  @Factory('gordo')
  lastname: string;

  @Factory('gato')
  name: string;

  @Factory(hashSync('gatode4kilos', 10))
  password: string;

  @Factory(null)
  purchase_order: OrderPurchase[] | null = null;

  @Factory(new Date())
  createdAt: Date;

  @Factory((faker) => faker.string.uuid())
  id: string;

  @Factory(new Date())
  updatedAt: Date;
}
