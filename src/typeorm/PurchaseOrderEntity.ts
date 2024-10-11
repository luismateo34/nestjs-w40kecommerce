import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './ProductEntity';
import { ClienEntity } from './ClientEntity';

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
  @OneToMany(() => ClienEntity, (item) => item.purchase_order)
  // name, lastname
  client: [string, string];
  @Column()
  amount: number;
  @Column()
  envoy: boolean;
}
