import { find } from '@/purchase/domain/port/driver/for-find';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';
import { findType } from '@/purchase/domain/port/driven/for-find-diven';

export class Find implements find {
  constructor(readonly findService: findType) {}
  async find_Client(name: string): Promise<OrderPurchase[]> {
    const resp = await this.findService.find_Client(name);
    if (resp.length === 0) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
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
  async find_Id(id: string): Promise<OrderPurchase> {
    const resp = await this.findService.find_Id(id);
    if (resp.id === undefined) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
  async find_Id_Client(id: string, name: string): Promise<OrderPurchase> {
    const resp = await this.findService.find_client_Id(name, id);
    if (resp.id === undefined) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
}
