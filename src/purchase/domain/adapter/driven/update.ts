import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '@/typeorm/PurchaseOrderEntity';
import { updateType } from '../../port/driven/for-update-driven';
import { orderCreate } from '@/purchase/domain/usecase/usecases';

@Injectable()
export class UpdateOrder implements updateType {
  constructor(
    @InjectRepository(OrderEntity)
    private order: Repository<OrderEntity>,
  ) {}
  async update(order: orderCreate): Promise<void> {
    await this.order.save(order);
  }
  async updateEnvoy(id: string): Promise<void> {
    await this.order.update({ id: id }, { envoy: true });
  }
}
