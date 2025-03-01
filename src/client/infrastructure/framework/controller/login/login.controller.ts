import {
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//--------------------------------------------------------------------------------------
import {
  subroutes,
  authroutes,
  clientRoute,
} from 'src/client/application/routes/clientRoutes';
//----guards
import { localAuthGuard } from 'src/client/infrastructure/framework/guard/localGuard';
import { refreshAuthGuard } from 'src/client/infrastructure/framework/guard/refreshGuard';
//----- service
import { JwtClientService } from 'src/client/infrastructure/framework/service/jwt-client/jwt-client.service';
import { RefreshClientService } from 'src/client/infrastructure/framework/service/refresh-client/refresh-client.service';
//--------------------------------------------------------------------------------------
import { clientJwt } from 'src/client/application/type/clientJtw';
import { tokenClient } from 'src/client/infrastructure/framework/enum/token';
//--------------------------------------------------------------------------------------
/*----*/
@ApiTags(`${clientRoute.client}-${subroutes.auth}`)
@Controller(subroutes.auth)
export class LoginController {
  constructor(
    private readonly jwtClientService: JwtClientService,
    private readonly refreshClientService: RefreshClientService,
  ) {}
  //--------------------------------------------------------------------------------------
  @Post(authroutes.login)
  @UseGuards(localAuthGuard)
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const userlocal = req.user as clientJwt;
    await this.jwtClientService.Login(userlocal, res);
    await this.refreshClientService.Init_Service_Refresh_Token(userlocal, res);
  }
  //--------------------------------------------------------------------------------------
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden',
  })
  @UseGuards(localAuthGuard)
  @Post(authroutes.logout)
  //--------------------------------------------------------------------------------------
  async logout(@Req() req: any, @Res() res: Response): Promise<void> {
    res
      .json({
        adminLoggin: 'false',
      })
      .clearCookie(tokenClient.access_token_client)
      .clearCookie(tokenClient.refresh_token_client)
      .redirect('/api');
    return req.logout();
  }
  //--------------------------------------------------------------------------------------
  @UseGuards(refreshAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden',
  })
  @Post(authroutes.refresh)
  //--------------------------------------------------------------------------------------
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.refreshClientService.RefreshLoggin(req, res);
  }
}
