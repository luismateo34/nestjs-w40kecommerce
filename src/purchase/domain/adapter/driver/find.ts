import { find } from '@/purchase/domain/port/driver/for-find';
import { FindService } from '@/purchase/domain/adapter/driven/find';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';

export class Find implements find {
  constructor(readonly findService: FindService) {}
  async findByclient(name: string): Promise<OrderPurchase[] | Error> {
    const resp = await this.findService.findByclient(name);
    if (resp.length === 0) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
  async findByDate(date: Date): Promise<OrderPurchase[] | Error> {
    const resp = await this.findService.findByDate(date);
    if (resp.length === 0) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
  async findById(id: string): Promise<OrderPurchase | Error> {
    const resp = await this.findService.findById(id);
    if (resp.id === undefined) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
  async findByIdAndClient(
    id: string,
    name: string,
  ): Promise<OrderPurchase | Error> {
    const resp = await this.findService.findByclientandId(name, id);
    if (resp.id === undefined) {
      throw new Error('dato no encontrado');
    }
    return resp;
  }
}
