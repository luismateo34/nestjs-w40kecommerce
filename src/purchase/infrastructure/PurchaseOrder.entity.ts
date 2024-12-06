import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderPurchase } from '../domain/entity/entityInterfaceOrder';
import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { ProductEntity } from '../../product/infrastructure/Product.entity';
import { ClientEntity } from '../../client/infrastructure/Client.entity';

@Entity({ name: 'order' })
export class OrderEntity implements OrderPurchase {
  @PrimaryGeneratedColumn()
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
  @ManyToOne(() => ClientEntity, (item) => item.purchase_order)
  client: client;

  @ManyToMany(() => ProductEntity, (item) => item.OrderPurchase)
  @JoinTable({ name: 'order_product' })
  products: ProductEntity[];

  @Column()
  clientId: string;

  @Column()
  amount: number;

  @Column({ nullable: true })
  envoy: boolean;
}
