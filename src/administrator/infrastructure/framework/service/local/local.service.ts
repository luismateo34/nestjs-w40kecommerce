import { Injectable } from '@nestjs/common';
import { Login } from 'src/administrator/application/usecase';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';

@Injectable()
export class AuthService {
  async validateUser(
    name: string,
    lastname: string,
    password: string,
  ): Promise<PayloadJwt> {
    const user = await Login.loginLocal(name, lastname, password);
    return user;
  }
}
