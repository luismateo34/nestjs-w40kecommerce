import {
  CreateCash,
  createCashDriven,
} from 'src/cashflow/domain/adapter/driving';
import { ormcashflow } from 'src/cashflow/domain/entity/ormCashflow';

/*se crea una vez al dia*/
export class CreateMethod {
  private method: CreateCash;
  constructor(readonly database: ormcashflow) {
    this.method = new CreateCash(new createCashDriven(database));
  }
  async create_Cash_Order_day(): Promise<'success'> {
    const dateDay = new Date();
    const year = dateDay.getFullYear();
    const month = dateDay.getMonth();
    const day = dateDay.getDate();
    return await this.method.create_Cash_Order_day(year, month, day);
  }
}
