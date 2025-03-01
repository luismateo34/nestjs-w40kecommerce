import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
//---------------------------------------------------------------------------------------
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies.access_token;
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  //--------------------------------------------------
  async validate(payload: any) {
    const token: PayloadJwt = {
      id: payload.id,
      lastname: payload.lastname,
      name: payload.name,
      role: payload.role,
    };
    return token;
  }
}
