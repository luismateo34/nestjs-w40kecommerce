import {
  NameandLastname,
  Email,
  Password,
  Phone,
  Permissions as permissionsDto,
} from '@/administrator/domain/validate/admin';
import { validate } from 'class-validator';
import { permissions } from '@/administrator/domain/entity/entityAdminInterface';
import { UpdateService } from '../driven';
import { ForUpdateAdmin } from '../../port/driver/for-update-admin';

export class Update implements ForUpdateAdmin {
  constructor(private service: UpdateService) {}
  async updateEmail(
    email: string,
    lastname: string,
    name: string,
  ): Promise<Error | 'success'> {
    const dto = new NameandLastname();
    const emailDto = new Email();
    dto.lastname = lastname;
    dto.name = name;
    emailDto.email = email;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const errMail = await validate(emailDto);
    if (errMail.length > 0) {
      throw new Error('mail invalido');
    }
    await this.service.updateEmail(email, lastname, name);
    return 'success';
  }
  async updatePassword(
    lastname: string,
    name: string,
    password: string,
  ): Promise<Error | 'success'> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const pass = new Password();
    pass.password = password;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const errPass = await validate(pass);
    if (errPass.length > 0) {
      throw new Error('invalid password');
    }
    await this.service.updatePassword(lastname, name, password);
    return 'success';
  }
  async updatePermissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<Error | 'success'> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const permDto = new permissionsDto();
    permDto.permissions = permissions;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const respErr = await validate(permDto);
    if (respErr.length > 0) {
      throw new Error('permiso inexistente');
    }
    await this.service.updatePermissions(lastname, name, permissions);
    return 'success';
  }
  async updatePhone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<Error | 'success'> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const dtoPhone = new Phone();
    dtoPhone.phone = phone;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    const phoneErr = await validate(dtoPhone);
    if (phoneErr.length > 0) {
      throw new Error('telefono invalido');
    }
    await this.service.updatePhone(lastname, name, phone);
    return 'success';
  }
}
