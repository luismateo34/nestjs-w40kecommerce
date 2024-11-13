import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { cipher } from 'src/administrator/application/encripted/encripted';

@Injectable()
export class refreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies.refresh_token;
          return cipher.decrypted(token);
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_REFRESH'),
    });
  }

  async validate(payload: PayloadJwt) {
    return payload;
  }
}
