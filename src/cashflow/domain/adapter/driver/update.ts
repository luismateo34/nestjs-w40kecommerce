import { updateDriver } from '@/cashflow/domain/port/driver/for-updateCash';
import { updateMethod } from '@/cashflow/domain/port/driven/for-updateCash-driven';
import { Dataday } from '@/cashflow/domain/validation/validate';
import { validate } from 'class-validator';

export class Update implements updateDriver {
  constructor(private service: updateMethod) {}
  async update_Balance_Day(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    this.service.update_Balance_Day(year, month, day);
    return 'success';
  }
  async update_Balance_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    this.service.update_Balance_Month(year, month, day);
    return 'success';
  }
  async update_Expense_Day(
    year: number,
    month: number,
    day: number,
    expenses: number,
  ): Promise<Error | 'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    if (expenses.toString().length === 0) {
      throw new Error('ingrese el valor de expense');
    }
    this.service.update_Expense_Day(year, month, day, expenses);
    return 'success';
  }
  async update_Expense_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    this.service.update_Expense_Month(year, month, day);
    return 'success';
  }
  async update_Revenue_Day(
    year: number,
    month: number,
    day: number,
    revenue: number,
  ): Promise<Error | 'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    if (revenue.toString().length === 0) {
      throw new Error('ingrese el valor de revenue');
    }
    await this.service.update_Revenue_Day(year, month, day, revenue);
    return 'success';
  }
  async update_Revenue_Month(
    year: number,
    month: number,
    day: number,
  ): Promise<Error | 'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    await this.service.update_Revenue_Month(year, month, day);
    return 'success';
  }
}
