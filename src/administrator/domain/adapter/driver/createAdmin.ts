import { AdminDto } from '@/administrator/domain/validate/admin';
import { validate as validateAction } from 'class-validator';
import {
  admin,
  permissions,
} from '@/administrator/domain/entity/entityAdminInterface';
import { CreateandValidate } from '../../port/driver/for-create-and-validate';
import { ForCreateAdmin } from '@/administrator/domain/port/driven/for-create-admin';
import { FindPermision } from '@/administrator/domain/port/driven/for-find-permision';

export class CreateAdministrator implements CreateandValidate {
  constructor(
    private service: ForCreateAdmin,
    private permission: FindPermision,
  ) {}
  private dto = new AdminDto();

  async validate(user: admin): Promise<Error | 'success'> {
    this.dto.name = user.name;
    this.dto.lastname = user.lastname;
    this.dto.email = user.email;
    this.dto.phone = user.phone;
    this.dto.permissions = user.permissions;
    this.dto.password = user.password;
    const errorsearch = await validateAction(this.dto);
    if (errorsearch.length > 0) {
      throw new Error('datos no validos');
    }
    const permission = await this.permission.get_Permision(
      user.name,
      user.lastname,
    );
    if (permission != permissions.SUPERADMIN) {
      throw new Error(' no tiene permisos ');
    }

    await this.service.create_Admin(user);
    return 'success';
  }
}
