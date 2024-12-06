import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FindMethod } from 'src/purchase/application/usecases/find';
import {
  subRoutes,
  findRoutes,
} from 'src/purchase/application/routes/purchaseRoutes';
import { clientJwt } from 'src/client/application/type/clientJtw';
import { string_month_spanish } from 'src/cashflow/application/month/month';
import { JwtAuthGuard } from 'src/client/infrastructure/framework/guard/jwtGuard';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { Response, Request } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
/*---*/

@ApiTags(subRoutes.find)
@Controller(subRoutes.find)
export class FindController {
  constructor(
    @Inject('FindMethod') private readonly find: FindMethod,
    private readonly permissionsAuth: permissions,
  ) {}

  /*----*/
  @Get(`${findRoutes.id_client}/:id`)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error.',
  })
  @UseGuards(JwtAuthGuard)
  async client_name(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const permAdmin = await this.permissionsAuth.adminAuth(req);
      let authObj: clientJwt | null;
      if (!permAdmin) {
        authObj = await this.permissionsAuth.clientPayload(req);
      }
      if (authObj !== null && authObj.id !== id) {
        throw new HttpException(`error: forbidden`, HttpStatus.FORBIDDEN);
      }
      /*----*/
      const resp = await this.find.find_by_ClientId(id);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'error: Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /*----*/
  @Get(findRoutes.orders_date)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error.',
  })
  async order_day(
    @Query('day') day: number,
    @Query('month') month: string_month_spanish,
    @Query('year') year: number,
    @Res() res: Response,
  ) {
    try {
      const resp = await this.find.find_Orders_Date(day, year, month);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'error: Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /*----*/
  @Get(findRoutes.orders_month)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error.',
  })
  @UseGuards(JwtAuthGuard)
  async order_month(
    @Query('month') month: string_month_spanish,
    @Query('year') year: number,
    @Res() res: Response,
  ) {
    try {
      const resp = await this.find.find_Orders_Month(month, year);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'error: Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /*---ultimo--*/
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'bad request' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error.',
  })
  @UseGuards(JwtAuthGuard)
  async by_Id(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.find.find_Id(id);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'error: Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
