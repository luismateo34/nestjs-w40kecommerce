import { ClientEntity } from '@/client/infrastructure/ClientEntity';
import { ProductEntity } from '@/product/infrastructure/ProductEntity';
import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';
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
  // name, lastname
  client: [string, string];
  @Column()
  amount: number;
  @Column()
  envoy: boolean;
}
@Injectable()
export class InjectOrder {
  constructor(
    @InjectRepository(OrderEntity)
    private adminInject: Repository<OrderEntity>,
  ) {
    this.order = this.adminInject;
  }
  readonly order: Repository<OrderEntity>;
}
