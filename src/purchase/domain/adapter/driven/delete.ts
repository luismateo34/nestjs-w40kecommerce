import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '@/typeorm/PurchaseOrderEntity';
import { deleteType } from '../../port/driven/for-delete-driven';

@Injectable()
export class DeleteOrder implements deleteType {
  constructor(
    @InjectRepository(OrderEntity)
    private order: Repository<OrderEntity>,
  ) {}
  async deleteOrder(id: string): Promise<void> {
    await this.order.delete({ id: id });
  }
}
