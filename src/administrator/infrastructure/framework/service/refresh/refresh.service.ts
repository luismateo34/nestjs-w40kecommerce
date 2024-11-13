import {
  Injectable,
  Request,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'src/administrator/application/usecase/login';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';
import {
  type Response as ResponseExpress,
  type Request as RequestExpress,
} from 'express';
import { ConfigService } from '@nestjs/config';
import { token } from 'src/administrator/infrastructure/framework/enum/token';
import { cipher } from 'src/administrator/application/encripted/encripted';
import { JwtMethod } from 'src/administrator/infrastructure/framework/service/jwt/jwt.service';

@Injectable()
export class RefreshMethod {
  constructor(
    private usersService = Login,
    private jwtService: JwtService,
    private configService: ConfigService,
    private jwtMethod: JwtMethod,
  ) {}

  private async validateUser(token: PayloadJwt): Promise<PayloadJwt> {
    const user = await this.usersService.loginToken(token);
    if (user.id === undefined || user.id.length === 0) {
      throw new Error();
    }
    return user;
  }

  private async refreshtoken(payloadAdmin: PayloadJwt) {
    return {
      refresh_token: this.jwtService.sign(payloadAdmin, {
        secret: process.env.JWT_REFRESH,
        expiresIn: '24h',
      }),
    };
  }

  private addHours(date: Date, hours: number): Date {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }

  async RefreshToken(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    try {
      const admin = req.user as PayloadJwt;
      const validate = await this.validateUser(admin);
      const jwt = await this.refreshtoken(validate);
      const criptedCookie = cipher.encrypted(jwt.refresh_token);
      res
        .cookie(token.refresh_token, criptedCookie, {
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production',
          expires: this.addHours(new Date(), 1),
        })
        .json({ adminLoggin: 'true' });
    } catch {
      throw new UnauthorizedException();
    }
  }
  async RefreshLoggin(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    try {
      const admin = req.cookies.refresh_token as PayloadJwt;
      const validate = await this.validateUser(admin);
      const jwt = await this.refreshtoken(validate);
      const criptedCookie = cipher.encrypted(jwt.refresh_token);
      this.jwtMethod.Refresh(res, admin);
      res
        .cookie(token.refresh_token, criptedCookie, {
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production',
          expires: this.addHours(new Date(), 1),
        })
        .json({ adminLoggin: 'true' });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
