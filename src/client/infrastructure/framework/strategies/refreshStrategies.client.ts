import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(configService: ConfigService) {
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
  //---------------------------------------------------
  async validate(payload: any) {
    return payload;
  }
}
