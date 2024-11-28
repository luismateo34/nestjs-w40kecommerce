import {
  Controller,
  Get,
  Inject,
  Res,
  Req,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  subroutes,
  findroutes,
} from 'src/client/application/routes/clientRoutes';
import { FindMethod } from 'src/client/application/usecase/find';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/client/infrastructure/framework/guard/jwtGuard';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { clientJwt } from 'src/client/application/type/clientJtw';
/*guard*/
import { JwtAuthGuard as guardAdmin } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
/*---*/
@Controller(subroutes.find)
export class FindController {
  constructor(
    @Inject('FindMethod') private service: FindMethod,
    private readonly perm: permissions,
  ) {}
  /*----*/
  @Get(findroutes.orderPurchase)
  @UseGuards(JwtAuthGuard)
  async orderPurchase(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const adminAuth = await this.perm.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.perm.checkPermissions(req);
      }
      if (
        (!adminAuth && client.lastname !== lastname) ||
        client.name !== name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*----*/
      const resp = await this.service.Get_Client_Order_Purchase(name, lastname);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*-----*/
  @Get(findroutes.clientAllData)
  @UseGuards(JwtAuthGuard)
  async clientAllData(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const adminAuth = await this.perm.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.perm.checkPermissions(req);
      }
      if (
        (!adminAuth && client.lastname !== lastname) ||
        client.name !== name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*------*/
      const resp = await this.service.Get_Client(name, lastname);
      const obj = {
        name: resp.name,
        lastname: resp.lastname,
        email: resp.email,
        id: resp.id,
        createDate: resp.createdAt,
        order: resp.purchase_order,
      };
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /*-----*/
  @Get(findroutes.productPurchase)
  @UseGuards(JwtAuthGuard)
  async productPurchase(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const adminAuth = await this.perm.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.perm.checkPermissions(req);
      }
      if (
        (!adminAuth && client.lastname !== lastname) ||
        client.name !== name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*----*/
      const resp = await this.service.Get_Client_Product_Purchase(
        name,
        lastname,
      );
      res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // id
  // solo para administrador
  @UseGuards(guardAdmin)
  @Get(':id')
  async find_by_Id(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.service.Get_Client_Id(id);
      res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
