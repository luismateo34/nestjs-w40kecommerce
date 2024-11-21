import { createClientDriver } from 'src/client/domain/port/driver/for-create';
import { createType } from 'src/client/domain/port/driven/for-createClient-driven';
import { clientDTO } from 'src/client/domain/validation/validate';
import { validate } from 'class-validator';

export class CreateClientDriver implements createClientDriver {
  constructor(private method: createType) {}
  async Create_Client(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<'success'> {
    const dto = new clientDTO();
    dto.email = email;
    dto.password = password;
    dto.name = name;
    dto.lastname = lastname;

    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos no validos');
    }

    await this.method.Create_Client(name, lastname, password, email);
    return 'success';
  }
}
