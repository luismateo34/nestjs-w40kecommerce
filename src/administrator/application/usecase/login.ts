import {
  DrivenFind,
  FindAdmin,
} from 'src/administrator/domain/adapter/driving';
import { compare } from 'bcrypt';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class Login {
  private method: FindAdmin;
  constructor(protected service: adminOrm) {
    this.method = new FindAdmin(new DrivenFind(service));
  }
  async loginToken(payload: PayloadJwt): Promise<PayloadJwt> {
    const { id, lastname, name } = payload;
    const admin = await this.method.find_Name_Lastname(name, lastname);
    if (admin.id !== id) {
      throw new Error('id incorrecto');
    }
    return payload;
  }

  async loginLocal(
    name: string,
    lastname: string,
    password: string,
  ): Promise<PayloadJwt> {
    const admin = await this.method.find_Name_Lastname(name, lastname);
    const resp = await compare(password, admin.password);
    if (!resp) {
      throw new Error('password incorrect');
    }
    const response: PayloadJwt = {
      name: admin.name,
      lastname: admin.lastname,
      id: admin.id,
      role: admin.permissions,
    };
    return response;
  }
}
