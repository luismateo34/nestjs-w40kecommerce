import {
  Controller,
  Post,
  Delete,
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
import { routes, subroutes } from 'src/administrator/application/router/router';
import { LocalAuthGuard } from 'src/administrator/infrastructure/framework/guard/local/local-auth.guard';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { JwtMethod } from 'src/administrator/infrastructure/framework/service/jwt/jwt.service';
import { RefreshMethod } from 'src/administrator/infrastructure/framework/service/refresh/refresh.service';

@Controller(routes.admin)
export class AuthController {
  constructor(
    private authServiceJWT: JwtMethod,
    private refreshJwt: RefreshMethod,
  ) {}
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(subroutes.login)
  async login(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    await this.authServiceJWT.Login(res, req);
    await this.refreshJwt.RefreshToken(res, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(subroutes.logaut)
  async logout(@Response() res: ResponseExpress) {
    res
      .json({
        adminLoggin: 'false',
      })
      .clearCookie(token.access_token)
      .clearCookie(token.refresh_token)
      .redirect('/api');
  }

  @UseGuards(JwtAuthGuard)
  @Delete(subroutes.refresh)
  async refresh(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    await this.refreshJwt.RefreshLoggin(res, req);
  }
}
