import { Inject, Injectable } from '@nestjs/common';
import { Login } from 'src/administrator/application/usecase';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(@Inject('Login') private readonly login: Login) {}
  async validateUser(
    name: string,
    lastname: string,
    password: string,
  ): Promise<PayloadJwt> {
    const user = await this.login.loginLocal(name, lastname, password);
    return user;
  }
}
