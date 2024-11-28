import { Controller, Post, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  subroutes,
  authroutes,
} from 'src/client/application/routes/clientRoutes';
import { localAuthGuard } from 'src/client/infrastructure/framework/guard/localGuard';
import { refreshAuthGuard } from 'src/client/infrastructure/framework/guard/refreshGuard';
import { JwtClientService } from 'src/client/infrastructure/framework/service/jwt-client/jwt-client.service';
import { RefreshClientService } from 'src/client/infrastructure/framework/service/refresh-client/refresh-client.service';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { tokenClient } from 'src/client/infrastructure/framework/enum/token';
/*-----*/

@Controller(subroutes.auth)
export class LoginController {
  constructor(
    private readonly jwtClientService: JwtClientService,
    private readonly refreshClientService: RefreshClientService,
  ) {}
  /*------*/
  @Post(authroutes.login)
  @UseGuards(localAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    const userlocal = req.user as clientJwt;
    await this.jwtClientService.Login(userlocal, res);
    await this.refreshClientService.Init_Service_Refresh_Token(userlocal, res);
  }
  /*------*/
  @Post(authroutes.logout)
  @UseGuards(localAuthGuard)
  async logout(@Req() req: any, @Res() res: Response) {
    res
      .json({
        adminLoggin: 'false',
      })
      .clearCookie(tokenClient.access_token_client)
      .clearCookie(tokenClient.refresh_token_client)
      .redirect('/api');

    return req.logout();
  }
  /*------*/
  @UseGuards(refreshAuthGuard)
  @Post(authroutes.refresh)
  async refresh(@Req() req: Request, @Res() res: Response) {
    await this.refreshClientService.RefreshLoggin(req, res);
  }
}
