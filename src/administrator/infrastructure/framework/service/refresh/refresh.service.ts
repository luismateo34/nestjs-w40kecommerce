import {
  HttpStatus,
  Inject,
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
export class RefreshMethod {
  constructor(
    @Inject('Login') private readonly login: Login,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /*-----*/
  private async validateUser(token: PayloadJwt): Promise<PayloadJwt> {
    const user = await this.login.loginToken(token);
    if (user.id === undefined || user.id.length === 0) {
      throw new Error();
    }
    return user;
  }

  /*-----*/
  private async create_refresh_token_method(payloadAdmin: PayloadJwt) {
    return {
      refresh_token: this.jwtService.sign(payloadAdmin, {
        secret: process.env.JWT_REFRESH,
        expiresIn: '24h',
      }),
    };
  }

  /*-----*/
  private addHours(date: Date, hours: number): Date {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }
  /*-----*/
  async RefreshToken(req_user: PayloadJwt, @Response() res: ResponseExpress) {
    try {
      const validate = await this.validateUser(req_user);
      const jwt = await this.create_refresh_token_method(validate);
      const criptedCookie = cipher.encrypted(jwt.refresh_token);
      /*---*/
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
  /*-----*/
  async RefreshLoggin(
    @Request() req: RequestExpress,
    @Response() res: ResponseExpress,
  ) {
    try {
      const admin = req.cookies.refresh_token;
      const payload = this.jwtService.decode(admin) as PayloadJwt;
      /*refresca en refresh jwt admin*/
      await this.RefreshToken(payload, res);
      /*----*/
      const validate = await this.validateUser(payload);
      const jwt = await this.create_refresh_token_method(validate);
      const criptedCookie = cipher.encrypted(jwt.refresh_token);
      // refresca el jwt
      res
        .cookie(token.access_token_admin, criptedCookie, {
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production',
          expires: this.addHours(new Date(), 1),
        })
        .status(HttpStatus.ACCEPTED)
        .json({ adminLoggin: 'true' });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
