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
import { OrderpurchaseMethod } from './method/orderPurchaseMethod';
import { ClientAllDataMehtod } from './method/clientAllDataMethod';
import { ProductPurchaseMethod } from './method/ProductPurchaseMethod';
/*guard*/
import { JwtAuthGuard as guardAdmin } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
/*---*/
@Controller(subroutes.find)
export class FindController {
  constructor(
    @Inject('FindMethod') private service: FindMethod,
    private readonly orderPurchaseMethod: OrderpurchaseMethod,
    private readonly clientAllDataMethod: ClientAllDataMehtod,
    private readonly productPurchaseMethod: ProductPurchaseMethod,
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
    return await this.orderPurchaseMethod.orderPurchase(
      name,
      lastname,
      req,
      res,
    );
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
    return await this.clientAllDataMethod.clientAllData(
      name,
      lastname,
      req,
      res,
    );
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
    return await this.productPurchaseMethod.productPurchase(
      name,
      lastname,
      req,
      res,
    );
  }
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
