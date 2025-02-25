import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/*-----*/
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { Login } from 'src/administrator/application/usecase';
import { FindMethod } from 'src/client/application/usecase/find';
import { clientJwt } from 'src/client/application/type/clientJtw';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    configService: ConfigService,
    @Inject('Login') private logginJwt: Login,
    @Inject('FindMethod') private findMethod: FindMethod,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const tokenadmin = req?.cookies.access_token_admin;
          const tokenclient = req?.cookies.access_token_client;
          if (tokenadmin !== undefined) {
            return tokenadmin;
          } else if (tokenadmin === undefined) {
            return tokenclient;
          }
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  //validate client and admin
  async validate(payload: any) {
    try {
      let payloadType: PayloadJwt | clientJwt;
      this.logginJwt
        .loginToken(payload)
        .then((el: PayloadJwt) => (payloadType = el))
        .catch(async () => {
          const payJwt: clientJwt = payload;
          const res = await this.findMethod.Get_Client_Id(payJwt.id);
          if (payJwt.name !== res[0] || payJwt.lastname !== res[1]) {
            throw new Error();
          }
          payloadType = payJwt;
        });
      return payloadType;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
