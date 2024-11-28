import { Injectable, Inject } from '@nestjs/common';
import { FindMethod } from 'src/client/application/usecase/find';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { compare } from 'bcrypt';

@Injectable()
export class LocalClientService {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  async validateUser(
    name: string,
    lastname: string,
    password: string,
  ): Promise<clientJwt> {
    const user = await this.find.Get_Client(name, lastname);
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new Error();
    }
    const resp: clientJwt = {
      id: user.id,
      lastname: user.lastname,
      name: user.name,
    };
    return resp;
  }
}
