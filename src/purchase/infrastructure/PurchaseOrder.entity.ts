import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
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
