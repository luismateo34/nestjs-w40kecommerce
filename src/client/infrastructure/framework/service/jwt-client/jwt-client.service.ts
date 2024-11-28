import {
  Injectable,
  Res,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { type Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { cipher } from 'src/administrator/application/encripted/encripted';
import { tokenClient } from 'src/client/infrastructure/framework/enum/token';

@Injectable()
export class JwtClientService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async methodJwt(payloadAdmin: clientJwt) {
    return {
      access_token_client: this.jwtService.sign(payloadAdmin, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
    };
  }
  private addHours(date: Date, hours: number): Date {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }
  async Login(req_user: clientJwt, @Res() res: Response) {
    try {
      const jwt = await this.methodJwt(req_user);
      const tokenCookie = cipher.encrypted(jwt.access_token_client);
      res
        .cookie(tokenClient.access_token_client, tokenCookie, {
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
