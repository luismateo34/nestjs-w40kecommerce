import { validate } from 'class-validator';
import { NameandLastname } from '@/administrator/domain/validate/admin';
import { ForDeleteAdmin } from '../../port/driver/for-delete-and-validate';
import { DeleteAdmin } from '../driven';

export class Delete implements ForDeleteAdmin {
  constructor(private readonly deletefn: DeleteAdmin) {}
  async deleteAdmin(
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
    await this.deletefn.deleteAdmin(name, lastname);
    return 'success';
  }
}
