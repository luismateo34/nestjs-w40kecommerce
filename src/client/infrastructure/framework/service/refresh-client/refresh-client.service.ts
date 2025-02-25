import { FindMethod } from 'src/client/application/usecase/find';
import {
  Injectable,
  Inject,
  Res,
  Req,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
/*---*/
import { clientJwt } from 'src/client/application/type/clientJtw';
import { tokenClient } from 'src/client/infrastructure/framework/enum/token';
/*-----*/
@Injectable()
export class RefreshClientService {
  constructor(
    @Inject('FindMethod') private readonly findMethod: FindMethod,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /*----------*/
  private async validateUser(token: clientJwt): Promise<clientJwt> {
    const user = await this.findMethod.Get_Client_Id(token.id);
    if (token.name !== user.name || token.lastname !== user.lastname) {
      throw new Error();
    }
    return token;
  }

  /*----------*/
  private async Create_refresh_token(payloadAdmin: clientJwt) {
    return {
      refresh_token: this.jwtService.sign(payloadAdmin, {
        secret: process.env.JWT_REFRESH,
        expiresIn: '24h',
      }),
    };
  }

  /*----------*/
  private addHours(date: Date, hours: number): Date {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }
  /*----------*/
  async Init_Service_Refresh_Token(
    body: clientJwt,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const validate = await this.validateUser(body);
      const jwt = await this.Create_refresh_token(validate);
      res
        .cookie(tokenClient.refresh_token_client, jwt.refresh_token, {
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production',
          expires: this.addHours(new Date(), 1),
        })
        .json({ adminLoggin: 'true' });
    } catch {
      throw new UnauthorizedException();
    }
  }
  /*----------*/
  // recibe un refresh_token y devuelve un access_token-client y un access_token_client
  async RefreshLoggin(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const cookie = req.cookies.cookies.refresh_token as string;
      const payload: clientJwt = this.jwtService.decode(cookie);
      const validate = await this.validateUser(payload);
      await this.Init_Service_Refresh_Token(validate, res);
      //
      const jwt = await this.Create_refresh_token(payload);
      res
        .cookie(tokenClient.access_token_client, jwt.refresh_token, {
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
