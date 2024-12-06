import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './PurchaseOrder.entity';
import { Repository } from 'typeorm';
import { ormPurchase } from 'src/purchase/domain/entity/ormPurchase';
import { OrderPurchase } from '../domain/entity/entityInterfaceOrder';
import { orderCreate } from '../domain/usecase/usecases';
import { Between } from 'typeorm';

export class Order implements ormPurchase {
  constructor(
    @InjectRepository(OrderEntity)
    private adminInject: Repository<OrderEntity>,
  ) {}
  async delete(id: string): Promise<void> {
    await this.adminInject.delete({ id: id });
  }
  async find_by_clientId(clientId: string): Promise<OrderPurchase[]> {
    return await this.adminInject.findBy({ clientId: clientId });
  }
  async update_Envoy(id: string, envoy: boolean): Promise<void> {
    await this.adminInject.update({ id: id }, { envoy: envoy });
  }
  async find_Id(id: string): Promise<OrderPurchase> {
    return await this.adminInject.findOneBy({ id: id });
  }
  async find_orders_by_day(day: Date, nextDay: Date): Promise<OrderPurchase[]> {
    const resp = await this.adminInject.findBy({
      createdAt: Between(day, nextDay),
    });
    const obj = resp.map((el) => {
      const obj: OrderPurchase = {
        amount: el.amount,
        createdAt: el.createdAt,
        envoy: el.envoy,
        id: el.id,
        products: el.products,
        updatedAt: el.updatedAt,
	client: el.client
      };
      return obj;
    });
    return obj;
  }

  async find_orders_by_month(
    month: Date,
    nextMonth: Date,
  ): Promise<OrderPurchase[]> {
    const resp = await this.adminInject.findBy({
      createdAt: Between(month, nextMonth),
    });
    const obj = resp.map((el) => {
      const obj: OrderPurchase = {
        amount: el.amount,
        createdAt: el.createdAt,
        envoy: el.envoy,
        id: el.id,
        products: el.products,
        updatedAt: el.updatedAt,
	client: el.client,
      };
      return obj;
    });
    return obj;
  }

  async find_Orders_Date(
    year: number,
    month: number,
    day: number,
  ): Promise<OrderPurchase[]> {
    const dayDate = new Date(year, month, day, 0, 0, 0);
    const nextdayDate = new Date(year, month, day + 1, 0, 0, 0);
    const obj = await this.adminInject.findBy({
      createdAt: Between(dayDate, nextdayDate),
    });
    const resp = obj.map((el) => {
      const objEl: OrderPurchase = {
        amount: el.amount,
        createdAt: el.createdAt,
        envoy: el.envoy,
        id: el.id,
        products: el.products,
        updatedAt: el.updatedAt,
	client: el.client
      };
      return objEl;
    });
    return resp;
  }
  async save(order: orderCreate): Promise<OrderEntity> {
  return  await this.adminInject.save(order);
  }
}
