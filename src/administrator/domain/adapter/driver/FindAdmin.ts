import { AdminInterface } from 'src/administrator/domain/entity/entityAdminInterface';
import { validate } from 'class-validator';
import { Email, NameandLastname } from 'src/administrator/domain/validate/admin';
import { ForFindAdmin } from '../../port/driver/for-find-admin';
import { AdminEntity } from 'src/administrator/infrastructure/adminEntity';
import { ForFindAdmin as findService } from 'src/administrator/domain/port/driven/for-find-admin';

export class FindAdmin implements ForFindAdmin {
  constructor(private find: findService) {}
  async find_All(): Promise<AdminInterface[]> {
    return await this.find.find_All();
  }

  async find_Email(email: string): Promise<AdminEntity> {
    const mailDto = new Email();
    mailDto.email = email;
    const errorsearch = await validate(mailDto);
    if (errorsearch.length > 0) {
      throw new Error('mail invalido');
    }
    return this.find.find_Email(email);
  }
  async find_Name_Lastname(
    name: string,
    lastname: string,
  ): Promise<AdminEntity> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const resp = await this.find.find_Name_Lastname(name, lastname);
    return resp;
  }

  async find_Password(name: string, lastname: string): Promise<string> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const isExist = await this.find_Name_Lastname(name, lastname);
    if (isExist instanceof Error) {
      throw new Error();
    } else if (isExist.id === undefined) {
      throw new Error('no existe el usuario');
    }
    return await this.find.find_Password(name, lastname);
  }
}
