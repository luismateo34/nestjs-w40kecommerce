import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import type { Response as expressResponse } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//--------------------------------------------------------------------------------------
import {
  findEnum,
  findSearchEnum,
  subRoutes,
} from 'src/cashflow/application/routes/routes';
import { string_month_spanish } from 'src/cashflow/application/month/month';
import { JwtAuthGuard } from 'src/administrator/infrastructure/framework/guard/jwt/jwt-auth.guard';
//-------method-----------------------------------------------------------------
import { BalanceDayMethod } from './method/balanceDayMethod';
import { BalanceMonthMethod } from './method/balanceMonthMethod';
import { ExpenseDayMethod } from './method/expenseDayMethod';
import { ExpenseMonthMethod } from './method/expenseMonth';
import { RevenueDayMethod } from './method/revenueDayMethod';
import { RevenueMonthMethod } from './method/revenueMonthMethod';
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
@ApiTags(`admin-${subRoutes.find}`)
@Controller(subRoutes.find)
export class FindCashController {
  constructor(
    private readonly balance: BalanceDayMethod,
    private readonly balanceMonth: BalanceMonthMethod,
    private readonly expenseday: ExpenseDayMethod,
    private readonly expenseMonth: ExpenseMonthMethod,
    private readonly revenueday: RevenueDayMethod,
    private readonly revenueMonth: RevenueMonthMethod,
  ) {}
  //--------------------------------------------------------------------------------------
  @Get(`${findEnum.findBalance}_${findSearchEnum.day}`)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  //--------------------------------------------------------------------------------------
  async balanceday(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Query('day') day: number,
    @Response() res: expressResponse,
  ) {
    return await this.balance.balanceday(year, month, day, res);
  }
  //--------------------------------------------------------------------------------------
  @Get(`${findEnum.findBalance}_${findSearchEnum.month}`)
  @UseGuards(JwtAuthGuard)
  async balancemonth(
    @Query('year') year: number,
    @Query('month') month: string_month_spanish,
    @Response() res: expressResponse,
  ) {
    return await this.balanceMonth.balancemonth(year, month, res);
  }
  //--------------------------------------------------------------------------------------
  @Get(`${findEnum.findexpense}_${findSearchEnum.day}`)
  @UseGuards(JwtAuthGuard)
  async expense_day(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Query('day') day: number,
    @Response() res: expressResponse,
  ) {
    await this.expenseday.expenseday(year, month, day, res);
  }
  //--------------------------------------------------------------------------------------
  @Get(`${findEnum.findexpense}_${findSearchEnum.month}`)
  @UseGuards(JwtAuthGuard)
  async expense_Month(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Response() res: expressResponse,
  ) {
    return await this.expenseMonth.expense_Month(year, month, res);
  }
  //--------------------------------------------------------------------------------------
  @Get(`${findEnum.findRevenue}_${findSearchEnum.day}`)
  @UseGuards(JwtAuthGuard)
  async revenue_Day(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Query('day') day: number,
    @Response() res: expressResponse,
  ) {
    return await this.revenueday.revenueDay(year, month, day, res);
  }
  //--------------------------------------------------------------------------------------
  @Get(`${findEnum.findRevenue}_${findSearchEnum.month}`)
  @UseGuards(JwtAuthGuard)
  async revenue_Month(
    @Query('year') year: number,
    @Query('year') month: string_month_spanish,
    @Response() res: expressResponse,
  ) {
    return await this.revenueMonth.revenueMonth(year, month, res);
  }
}
