import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Injectable, Inject } from '@nestjs/common';
//----
import { clientJwt } from 'src/client/application/type/clientJtw';
import { Login } from 'src/administrator/application/usecase';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
/*---*/

@Injectable()
export class permissions {
  constructor(
    private readonly jwt: JwtService,
    @Inject('LOGIN_CLIENT') private readonly login: Login,
  ) {}
  private async decode(token: string): Promise<PayloadJwt> {
    return (await this.jwt.decode(token)) as PayloadJwt;
  }

  async adminAuth(req: Request): Promise<boolean> {
    try {
      const cookie = req.cookies.access_token_admin as string;
      const payload = await this.decode(cookie);
      const resp = await this.login.loginToken(payload);
      if (resp !== null) {
        return true;
      }
    } catch {
      return false;
    }
  }
  // EXTRACT CLIENT PAYLOAD
  async clientPayload(req: Request): Promise<clientJwt> {
    const cookie = req.cookies.access_token_client as string;
    const payload = (await this.jwt.decode(cookie)) as clientJwt;
    return payload;
  }
}
