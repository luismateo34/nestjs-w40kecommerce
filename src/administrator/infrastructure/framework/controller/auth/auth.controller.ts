import {
  Controller,
  Post,
  Response,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { token } from 'src/administrator/infrastructure/framework/enum/token';
import {
  type Response as ResponseExpress,
  type Request as RequestExpress,
} from 'express';
import { routes, auth } from 'src/administrator/application/router/router';
import { LocalAuthGuard } from 'src/administrator/infrastructure/framework/guard/local/local-auth.guard';
import { JwtMethod } from 'src/administrator/infrastructure/framework/service/jwt/jwt.service';
import { RefreshMethod } from 'src/administrator/infrastructure/framework/service/refresh/refresh.service';
import { refreshGuard } from 'src/administrator/infrastructure/framework/guard/refresh/refresh.guard';
import { PayloadJwt } from 'src/administrator/application/types/jwtPayload';

@Controller(routes.auth)
export class AuthController {
  constructor(
    private authServiceJWT: JwtMethod,
    private refreshJwt: RefreshMethod,
  ) {}
  /*-----*/
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(auth.login)
  async login(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    await this.authServiceJWT.Login(req.user as PayloadJwt, res);
    await this.refreshJwt.RefreshToken(req.user as PayloadJwt, res);
  }
  /*-----*/
  @UseGuards(LocalAuthGuard)
  @Post(auth.logaut)
  async logout(@Request() req: any, @Response() res: ResponseExpress) {
    res
      .json({
        adminLoggin: 'false',
      })
      .clearCookie(token.access_token_admin)
      .clearCookie(token.refresh_token)
      .redirect('/api');
    return req.logout();
  }

  /*-----*/
  @UseGuards(refreshGuard)
  @Post(auth.refresh)
  async refresh(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    await this.refreshJwt.RefreshLoggin(req, res);
  }
}
