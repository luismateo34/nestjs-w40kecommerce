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
import { FindMethod } from 'src/purchase/application/usecases/find';
import {
  subRoutes,
  findRoutes,
} from 'src/purchase/application/routes/purchaseRoutes';
import { string_month_spanish } from 'src/cashflow/application/month/month';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
import { Response } from 'express';

@Controller(subRoutes.find)
export class FindController {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}

  /*----*/
  @Get(findRoutes.name)
  @UseGuards(JwtAuthGuard)
  async client_name(@Query('name') name: string, @Res() res: Response) {
    try {
      const resp = await this.find.find_Client(name);
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
  @Get(findRoutes.orders_date)
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
