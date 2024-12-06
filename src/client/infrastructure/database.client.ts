import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './Client.entity';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { client } from '../domain/entity/entityInterfaceClient';

export class Client implements ormclient {
  constructor(
    @InjectRepository(ClientEntity)
    private adminInject: Repository<ClientEntity>,
  ) {}
  async update_purchase_orders(id: string, order: string[]): Promise<void> {
    await this.adminInject.update({ id: id }, { purchase_order: order });
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    await this.adminInject.update(
      { name: name, lastname: lastname },
      { password: password },
    );
  }
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void> {
    await this.adminInject.update(
      { name: name, lastname: lastname },
      { email: email },
    );
  }
  async Update_Client_Name(name: string, lastname: string): Promise<void> {
    await this.adminInject.update(
      { name: name, lastname: lastname },
      { name: name, lastname: lastname },
    );
  }
  async delete(name: string, lastname: string): Promise<void> {
    await this.adminInject.delete({ name: name, lastname: lastname });
  }
  async save(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void> {
    await this.adminInject.save({
      name: name,
      lastname: lastname,
      password: password,
      email: email,
    });
  }
  async get_by_name_lastname(name: string, lastname: string): Promise<client> {
    return await this.adminInject.findOneBy({ name: name, lastname: lastname });
  }
  async get_by_id(id: string): Promise<client> {
    return await this.adminInject.findOneBy({ id: id });
  }
}
