import { validate } from 'class-validator';
import { NameandLastname } from '@/administrator/domain/validate/admin';
import { ForDeleteAdmin } from '../../port/driver/for-delete-and-validate';
import { ForDeleteAdmin as deleteAdmin } from '@/administrator/domain/port/driven/for-delete-admin';

export class Delete implements ForDeleteAdmin {
  constructor(private deletefn: deleteAdmin) {}
  async delete_Admin(
    lastname: string,
    name: string,
  ): Promise<Error | 'success'> {
    const dto = new NameandLastname();
    dto.lastname = lastname;
    dto.name = name;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos invalidos');
    }
    await this.deletefn.delete_Admin(name, lastname);
    return 'success';
  }
}
