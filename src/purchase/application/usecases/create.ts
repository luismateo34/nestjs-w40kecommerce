import { orderCreate } from 'src/purchase/domain/usecase/usecases';
import {
  createDriven,
  CreateDriving,
} from 'src/purchase/domain/adapter/driving';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { orderCreateDto } from 'src/purchase/application/validate/orderCreate';
import { OrderPurchase } from 'src/purchase/domain/entity/entityInterfaceOrder';
/*---*/
export class createMethod {
  private service: CreateDriving;
  constructor(readonly database: ormPurchase) {
    this.service = new CreateDriving(new createDriven(database));
  }
  async create(orderType: orderCreateDto): Promise<OrderPurchase> {
    const order: orderCreate = { ...orderType, envoy: false };
    return await this.service.create(order);
  }
}
