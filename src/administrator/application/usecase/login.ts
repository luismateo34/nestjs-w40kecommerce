import { find } from 'src/administrator/domain/adapter/driver';
import { compare } from 'bcrypt';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';

export class Login {
  static async loginToken(payload: PayloadJwt): Promise<PayloadJwt> {
    const { id, lastname, name } = payload;
    const admin = await find.find_Name_Lastname(name, lastname);
    if (admin.id !== id) {
      throw new Error('id incorrecto');
    }
    return payload;
  }

  static async loginLocal(
    name: string,
    lastname: string,
    password: string,
  ): Promise<PayloadJwt> {
    const admin = await find.find_Name_Lastname(name, lastname);
    const resp = await compare(password, admin.password);
    if (!resp) {
      throw new Error('password incorrect');
    }
    const response = {
      name: admin.name,
      lastname: admin.lastname,
      id: admin.id,
    };
    return response;
  }
}
