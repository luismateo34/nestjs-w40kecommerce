import { AdminDto } from 'src/administrator/domain/validate/admin';
import { validate as validateAction } from 'class-validator';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';
import { CreateandValidate } from '../../port/driving/for-create-and-validate';
import { ForCreateAdmin } from 'src/administrator/domain/port/driven/for-create-admin';
import { ForFindAdmin } from 'src/administrator/domain/port/driven/for-find-admin';

export class CreateAdministrator implements CreateandValidate {
  constructor(
    private service: ForCreateAdmin,
    private find: ForFindAdmin,
  ) {}
  private dto = new AdminDto();

  async createAdmin(user: admin): Promise<'success'> {
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
    const resp = await this.find.find_Name_Lastname(user.name, user.lastname);
    if (
      resp.name !== user.name ||
      resp.lastname !== user.lastname ||
      resp.email !== user.email
    ) {
      throw new Error('usuario existente');
    }

    await this.service.create_Admin(user);
    return 'success';
  }
}
