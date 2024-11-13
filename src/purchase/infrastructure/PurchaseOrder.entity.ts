import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { OrderPurchase } from '../domain/entity/entityInterfaceOrder';
import { ProductEntity } from '../../product/infrastructure/Product.entity';
import { ClientEntity } from '../../client/infrastructure/Client.entity';

@Entity({ name: 'order' })
export class OrderEntity implements OrderPurchase {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createdAt!: Date;
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updatedAt!: Date;
  @ManyToMany(() => ProductEntity, (item) => item.order_product)
  products: string[];
  @Column()
  date: Date;
  @OneToMany(() => ClientEntity, (item) => item.purchase_order)
  client: string[];
  @Column()
  amount: number;
  @Column()
  envoy: boolean;
}
@Injectable()
export class Order {
  constructor(
    @InjectRepository(OrderEntity)
    private adminInject: Repository<OrderEntity>,
  ) {
    this.order = this.adminInject;
  }
  readonly order: Repository<OrderEntity>;
}
let inj: Order;

class provider {
  constructor(readonly method: Order) {}
  readonly order = this.method.order;
}

export const InjectOrder = new provider(inj);
