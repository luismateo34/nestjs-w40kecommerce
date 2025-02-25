import { purchase} from 'src/client/domain/type/purchase';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { client } from 'src/client/domain/entity/entityInterfaceClient';

export class ormMock implements ormclient {
  private clientObj: client;
  constructor(private client: client) {
    this.clientObj = this.client;
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    if (
      typeof name !== 'string' ||
      typeof lastname !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Error('Error');
    }
  }

  async Update_Client_Name(name: string, lastname: string): Promise<void> {
    if (typeof name !== 'string' || typeof lastname !== 'string') {
      throw new Error('Error');
    }
  }
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void> {
    if (
      typeof name !== 'string' ||
      typeof lastname !== 'string' ||
      typeof email !== 'string'
    ) {
      throw new Error('Error');
    }
  }
  async update_purchase_orders(id: string, order: purchase[]): Promise<void> {
    if (typeof id !== 'string' || typeof order !== 'object') {
      throw new Error('Error');
    }
  }
  async delete(name: string, lastname: string): Promise<void> {
    if (typeof name !== 'string' || typeof lastname !== 'string') {
      throw new Error('Error');
    }
  }
  async save(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void> {
    if (
      typeof name !== 'string' ||
      typeof lastname !== 'string' ||
      typeof password !== 'string' ||
      typeof email !== 'string'
    ) {
      throw new Error('Error');
    }
  }
  async get_by_id(id: string): Promise<client> {
    if (typeof id !== 'string') {
      throw new Error('Error');
    }
    return this.clientObj;
  }
  async get_by_name_lastname(name: string, lastname: string): Promise<client> {
    if (typeof name !== 'string' || typeof lastname !== 'string') {
      throw new Error('Error');
    }
    return this.clientObj;
  }
}
