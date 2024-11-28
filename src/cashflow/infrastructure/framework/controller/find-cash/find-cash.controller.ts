import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import type { Response as expressResponse } from 'express';
import { FindMethod } from 'src/cashflow/application/usacases/Find';
import {
  findEnum,
  findSearchEnum,
  subRoutes,
} from 'src/cashflow/application/routes/routes';
import { string_month_spanish } from '@/cashflow/application/month/month';
import { JwtAuthGuard } from '@/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';

@Controller(subRoutes.find)
export class FindCashController {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  @Get(`${findEnum.findBalance}_${findSearchEnum.day}`)
  @UseGuards(JwtAuthGuard)
  async balanceday(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Query('day') day: number,
    @Response() res: expressResponse,
  ) {
    try {
      const obj = await this.find.find_Balance_Year_Month_Day(year, month, day);
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(`${findEnum.findBalance}_${findSearchEnum.month}`)
  @UseGuards(JwtAuthGuard)
  async balancemonth(
    @Query('year') year: number,
    @Query('month') month: string_month_spanish,
    @Response() res: expressResponse,
  ) {
    try {
      const obj = await this.find.find_Balance_Year_Month(year, month);
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`${findEnum.findexpense}_${findSearchEnum.day}`)

  @UseGuards(JwtAuthGuard)
  async expenseday(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Query('day') day: number,
    @Response() res: expressResponse,
  ) {
    try {
      const obj = await this.find.find_Expense_Year_Month_Day(year, month, day);
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`${findEnum.findexpense}_${findSearchEnum.month}`)
  @UseGuards(JwtAuthGuard)
  async expenseMonth(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Response() res: expressResponse,
  ) {
    try {
      const obj = await this.find.find_Expense_Month(year, month);
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(`${findEnum.findRevenue}_${findSearchEnum.day}`)
  @UseGuards(JwtAuthGuard)
  async revenueDay(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Query('day') day: number,
    @Response() res: expressResponse,
  ) {
    try {
      const obj = await this.find.find_Expense_Year_Month_Day(year, month, day);
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(`${findEnum.findRevenue}_${findSearchEnum.month}`)
  @UseGuards(JwtAuthGuard)
  async revenueMonth(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Response() res: expressResponse,
  ) {
    try {
      const obj = await this.find.find_Expense_Month(year, month);
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error:${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
