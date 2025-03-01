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
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//--------------------------------------------------------------------------------------
import { FindMethod } from 'src/purchase/application/usecases/find';
import {
  subRoutes,
  findRoutes,
  purchaseRoute,
} from 'src/purchase/application/routes/purchaseRoutes';
import { string_month_spanish } from 'src/cashflow/application/month/month';
import { JwtAuthGuard } from 'src/client/infrastructure/framework/guard/jwtGuard';
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
@ApiTags(`${purchaseRoute.purchase}-${subRoutes.find}`)
@Controller(subRoutes.find)
export class FindController {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  //-------------------order-day-----------------------------------------------
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
  /*-------------------------------------------------------------------------------*/
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
  /*---------------------------order-month-----------------------------------------*/
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
  /*-------------------------------------------------------------------------------*/
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
  /*----------------find_by_id_order---------------------------------------------------*/
  @Get(`${findRoutes.id}/:id`)
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
  /*-------------------------------------------------------------------------------*/
  async find_by_Id_Order(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.find.find_by_Id(id);
      if (resp === null) {
        res.status(HttpStatus.OK).json({ purchase: 'no exist' });
      } else {
        res.status(HttpStatus.OK).json(resp);
      }
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
  /*----------------find_by_id_client-------------------------------------------------*/
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
  /*-------------------------------------------------------------------------------*/
  async find_by_Id_client(
    @Param('clientid') clientid: string,
    @Res() res: Response,
  ) {
    try {
      const resp = await this.find.find_by_ClientId(clientid);
      if (resp.length === 0) {
        res.status(HttpStatus.OK).json({ purchase: 'no exist' });
      } else {
        res.status(HttpStatus.OK).json(resp);
      }
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
