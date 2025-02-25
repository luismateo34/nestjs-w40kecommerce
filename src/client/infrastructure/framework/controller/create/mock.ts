import { client_createDto } from 'src/client/application/validate/name';
import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';

const order = {} as OrderPurchase;
export const clientObj: client = {
  createdAt: new Date(),
  email: 'gatogordo@michimail.com',
  id: '1',
  lastname: 'gordo',
  name: 'gato',
  password: 'gatogordo123',
  purchase_order: [order],
  updatedAt: new Date(),
};
export const client_dto: client_createDto = {
  email: 'gatogordo@gmail.com',
  lastname: 'gordo',
  name: 'gato',
  password: 'gatogordo123',
};
