import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '@/typeorm/PurchaseOrderEntity';
import { orderCreate } from '@/purchase/domain/usecase/usecases';
import { createType } from '../../port/driven/for-create-driven';

@Injectable()
export class CreateOrder implements createType {
  constructor(
    @InjectRepository(OrderEntity)
    private order: Repository<OrderEntity>,
  ) {}
  async create(order: orderCreate): Promise<void> {
    await this.order.save(order);
  }
}
