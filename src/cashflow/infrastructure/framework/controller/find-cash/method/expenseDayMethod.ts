import { FindMethod } from 'src/cashflow/application/usacases/Find';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { string_month_spanish } from 'src/cashflow/application/month/month';

@Injectable()
export class ExpenseDayMethod {
  constructor(@Inject('FindMethod') private readonly find: FindMethod) {}
  async expenseday(
    year: number,
    month: string_month_spanish,
    day: number,
    res: Response,
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
}
