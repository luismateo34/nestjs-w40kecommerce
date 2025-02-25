import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Login } from 'src/administrator/application/usecase';
//----
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @Inject('LOGIN') private login: Login,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies.access_token;
          return token;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadJwt) {
    try {
      return await this.login.loginToken(payload);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
