import {
  CreateClientDriving,
  CreateDriven,
} from 'src/client/domain/adapter/driving';
import { validate } from 'class-validator';
import { createClientDriving as createPort } from 'src/client/domain/port/driving/for-create';
import { ormclient } from 'src/client/domain/entity/ormclient';
import { client_createDto } from 'src/client/application/validate/name';

export class CreateMethod implements createPort {
  private sevice: CreateClientDriving;
  constructor(readonly database: ormclient) {
    this.sevice = new CreateClientDriving(new CreateDriven(database));
  }
  async Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<'success'> {
    const dto = new client_createDto();
    dto.email = email;
    dto.name = name;
    dto.lastname = lastname;
    dto.password = password;
    const err = await validate(dto);
    if (err.length > 0) {
      throw new Error('datos no validos');
    }
    return await this.sevice.Create_Client(name, lastname, password, email);
  }
}
