import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Login } from '@/administrator/application/usecase';
import { cipher } from 'src/administrator/application/encripted/encripted';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private logginJwt = Login,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req?.cookies.access_token;
          return cipher.decrypted(token);
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadJwt) {
    try {
      return await this.logginJwt.loginToken(payload);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
