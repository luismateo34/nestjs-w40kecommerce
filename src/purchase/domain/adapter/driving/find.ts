import { find } from 'src/purchase/domain/port/driving/for-find';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';
import { findType } from 'src/purchase/domain/port/driven/for-find-diven';

export class Find implements find {
  constructor(readonly findService: findType) {}

  async find_by_Id(id: string): Promise<OrderPurchase> {
    const resp = await this.findService.find_by_Id(id);
    if (resp.id === undefined) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
  /*---*/
  async find_Orders_Month(
    year: number,
    month: number,
  ): Promise<OrderPurchase[]> {
    const resp = await this.findService.find_Orders_Month(year, month);
    if (resp.length === 0) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }

  async find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]> {
    const resp = await this.findService.find_Orders_Date(year, month, day);
    if (resp.length === 0) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
}
