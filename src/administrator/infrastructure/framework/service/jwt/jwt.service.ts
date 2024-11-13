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

@Injectable()
export class JwtMethod {
  constructor(
    private usersService = Login,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async validateUser(token: PayloadJwt): Promise<PayloadJwt> {
    const user = await this.usersService.loginToken(token);
    if (user.id === undefined || user.id.length === 0) {
      throw new Error();
    }
    return user;
  }

  private async methodJwt(payloadAdmin: PayloadJwt) {
    return {
      access_token: this.jwtService.sign(payloadAdmin, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
    };
  }

  private addHours(date: Date, hours: number): Date {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }

  async Login(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    try {
      const admin = req.user as PayloadJwt;
      const validate = await this.validateUser(admin);
      const jwt = await this.methodJwt(validate);
      const tokenCookie = cipher.encrypted(jwt.access_token);
      res
        .cookie(token.access_token, tokenCookie, {
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production',
          expires: this.addHours(new Date(), 1),
        })
        .json({ adminLoggin: 'true' });
    } catch {
      throw new UnauthorizedException();
    }
  }
  async Refresh(@Response() res: ResponseExpress, admin: PayloadJwt) {
    try {
      const validate = await this.validateUser(admin);
      const jwt = await this.methodJwt(validate);
      const tokenCookie = cipher.encrypted(jwt.access_token);
      res
        .cookie(token.access_token, tokenCookie, {
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
