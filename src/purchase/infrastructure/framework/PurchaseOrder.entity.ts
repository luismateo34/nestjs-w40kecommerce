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
/*---*/
import {
  ObjProductOrder,
  OrderPurchase,
} from 'src/purchase/domain/entity/entityInterfaceOrder';
import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { ProductEntity } from 'src/product/infrastructure/framework/Product.entity';
import { ClientEntity } from 'src/client/infrastructure/framework/Client.entity';

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

  @ManyToMany(() => ProductEntity)
  @JoinTable({ name: 'order_product' })
  products: ObjProductOrder[];

  @Column()
  clientId: string;

  @Column()
  amount: number;

  @Column({ nullable: true })
  envoy: boolean;
}
