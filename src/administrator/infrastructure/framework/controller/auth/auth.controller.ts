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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(routes.auth)
@Controller(routes.auth)
export class AuthController {
  constructor(
    private authServiceJWT: JwtMethod,
    private refreshJwt: RefreshMethod,
  ) {}
  /*-----*/
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'bad request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'error en el servidor',
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'error en el servidor',
  })
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  async refresh(
    @Response() res: ResponseExpress,
    @Request() req: RequestExpress,
  ) {
    await this.refreshJwt.RefreshLoggin(req, res);
  }
}
