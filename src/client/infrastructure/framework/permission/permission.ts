import { JwtService } from '@nestjs/jwt';
import { cipher } from 'src/administrator/application/encripted/encripted';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { Login } from 'src/administrator/application/usecase';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
/*---*/

@Injectable()
export class permissions {
  constructor(
    private readonly jwt: JwtService,
    private readonly login: Login,
  ) {}
  async adminAuth(req: Request) {
    try {
      const cookie = req.cookies.access_token_admin as string;
      const payCipher = cipher.decrypted(cookie);
      const payload = (await this.jwt.decode(payCipher)) as PayloadJwt;
      const resp = await this.login.loginToken(payload);
      if (resp !== null) {
        return true;
      }
    } catch {
      return false;
    }
  }
  // EXTRACT CLIENT PAYLOAD
  async clientPayload(req: Request) {
    const cookie = req.cookies.access_token_client as string;
    const payCipher = cipher.decrypted(cookie);
    const payload = (await this.jwt.decode(payCipher)) as clientJwt;
    return payload;
  }
}
