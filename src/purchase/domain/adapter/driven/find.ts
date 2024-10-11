import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '@/typeorm/PurchaseOrderEntity';
import { finfType } from '../../port/driven/for-find-diven';
import { OrderPurchase } from '../../entity/entityInterfaceOrder';

@Injectable()
export class FindService implements finfType {
  constructor(
    @InjectRepository(OrderEntity)
    private order: Repository<OrderEntity>,
  ) {}
  async findByclient(name: string): Promise<OrderEntity[]> {
    const resp = await this.order.find({ where: { client: name } });
    return resp;
  }
  async findByDate(date: Date): Promise<OrderEntity[]> {
    const resp = await this.order.find({ where: { date: date } });
    return resp;
  }
  async findById(id: string): Promise<OrderEntity> {
    const resp = await this.order.findOneBy({ id: id });
    return resp;
  }

  async findByclientandId(name: string, id: string): Promise<OrderPurchase> {
    const resp = await this.findByclient(name);
    const search = resp.find((el) => el.id === id);
    return search;
  }
}
