import {
  NameandLastname,
  Email,
  Password,
  Phone,
  Permissions as permissionsDto,
} from 'src/administrator/domain/validate/admin';
import { validate } from 'class-validator';
import { permissions } from 'src/administrator/domain/entity/entityAdminInterface';
import { ForUpdateAdmin } from '../../port/driver/for-update-admin';
import { ForUpdateAdmin as UpdateService } from 'src/administrator/domain/port/driven/for-update-admin';

export class Update implements ForUpdateAdmin {
  constructor( protected service: UpdateService) {}
  async update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<'success'> {
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
    await this.service.update_Email(email, lastname, name);
    return 'success';
  }
  async update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<'success'> {
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
    await this.service.update_Password(lastname, name, password);
    return 'success';
  }
  async update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<'success'> {
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
    await this.service.update_Permissions(lastname, name, permissions);
    return 'success';
  }
  async update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<'success'> {
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
    await this.service.update_Phone(lastname, name, phone);
    return 'success';
  }
}
