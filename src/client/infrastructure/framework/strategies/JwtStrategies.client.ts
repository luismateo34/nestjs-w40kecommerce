import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          //extract admin token
          const adm = request.cookies?.access_token_admin;
          //extract client token
          const tokenclient = request.cookies?.access_token_client;
          if (adm !== undefined && tokenclient === undefined) {
            return adm;
          } else if (tokenclient !== undefined && adm === undefined) {
            return tokenclient;
          }
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  //---------------------------------------------------------------------------------------
  //validate client and admin
  async validate(payload: any) {
    return payload;
  }
}
