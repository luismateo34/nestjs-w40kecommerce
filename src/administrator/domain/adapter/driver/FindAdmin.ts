import { AdminInterface } from '@/administrator/domain/entity/entityAdminInterface';
import { AdminEntity } from '@/typeorm/adminEntity';
import { validate } from 'class-validator';
import { Email, NameandLastname } from '@/administrator/domain/validate/admin';
import { ForFindAdmin } from '../../port/driver/for-find-admin';
import { FindService } from '../driven';

export class FindAdmin implements ForFindAdmin {
  constructor(readonly find: FindService) {}

  async findAll(): Promise<AdminInterface[]> {
    return await this.find.findAll();
  }

  async findByEmail(email: string): Promise<AdminEntity | Error> {
    const mailDto = new Email();
    mailDto.email = email;
    const errorsearch = await validate(mailDto);
    if (errorsearch.length > 0) {
      throw new Error('mail invalido');
    }
    return this.find.findByEmail(email);
  }
  async findByNameandLastname(
    name: string,
    lastname: string,
  ): Promise<AdminEntity | Error> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    return await this.find.findByNameandLastname(name, lastname);
  }

  async findPassword(name: string, lastname: string): Promise<string | Error> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const isExist = await this.findByNameandLastname(name, lastname);
    if (isExist instanceof Error) {
      throw new Error();
    } else if (isExist.id === undefined) {
      throw new Error('no existe el usuario');
    }
    return await this.find.findPassword(name, lastname);
  }
}
