import { client } from 'src/client/domain/entity/entityInterfaceClient';

export class clientSeed implements client {
  email = 'gatogordo_naranja@gmail.com';

  lastname = 'gordo';

  name = 'gato';

  password: 'gatode4kilos';

  purchase_order: string[] | null = null;
}
