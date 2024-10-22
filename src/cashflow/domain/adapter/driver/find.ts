import { FindCash } from '@/cashflow/domain/port/driver/for-findCash';
import { findmethod } from '@/cashflow/domain/port/driven/for-findCash-driven';
import { validate } from 'class-validator';
import { Dataday } from '@/cashflow/domain/validation/validate';

export class Find implements FindCash {
  constructor(private service: findmethod) {}
  async find_Balance_Year_Month_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | Error> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    const resp = await this.service.find_Balance_day(year, month, day);
    return resp;
  }
  async find_Expense_Month(
    year: number,
    month: number,
  ): Promise<[Date, number] | Error> {
    if (
      year.toString().length !== 4 &&
      month.toString().length === 0 &&
      month.toString().length > 2
    ) {
      throw new Error('fechas no validas');
    }
    const resp = await this.service.find_Expense_Month(year, month);
    return resp;
  }
  async find_Expense_Year_Month_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | Error> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;
    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    const resp = await this.service.find_Expense_Day(year, month, day);
    return resp;
  }
  async find_Revenue_Month(
    year: number,
    month: number,
  ): Promise<[Date, number] | Error> {
    if (
      year.toString().length !== 4 &&
      month.toString().length === 0 &&
      month.toString().length > 2
    ) {
      throw new Error('fechas no validas');
    }
    const resp = await this.service.find_Revenue_Month(year, month);
    return resp;
  }

  async find_Revenue_Year_Month_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<[Date, number] | Error> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;
    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    const resp = await this.service.find_Revenue_Day(year, month, day);
    return resp;
  }
}
