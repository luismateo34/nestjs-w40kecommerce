import { Create } from '@/cashflow/domain/port/driver/for-createCash';
import { createCash } from '@/cashflow/domain/port/driven/for-create-cashflow-driven';
import { Dataday } from '@/cashflow/domain/validation/validate';
import { validate } from 'class-validator';

export class CreateCash implements Create {
  constructor(private service: createCash) {}
  async create_Cash_Order_day(
    year: number,
    month: number,
    day: number,
  ): Promise<'success'> {
    const dto = new Dataday();
    dto.day = day;
    dto.month = month;
    dto.year = year;

    const errorsearch = await validate(dto);
    if (errorsearch.length > 0) {
      throw new Error('fechas no validas');
    }
    this.service.create_Cash_Order_day(year, month, day);
    return 'success';
  }
}
