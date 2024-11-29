import { FindMethod } from 'src/cashflow/application/usacases/Find';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { string_month_spanish } from 'src/cashflow/application/month/month';

@Injectable()
export class RevenueMonthMethod {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  async revenueMonth(year: number, month: string_month_spanish, res: Response) {
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
