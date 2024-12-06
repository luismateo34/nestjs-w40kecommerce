import {
  Column,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { product } from '../domain/entity/entityInterfaceProduct';
import { OrderEntity } from 'src/purchase/infrastructure/PurchaseOrder.entity';
import { OrderPurchase } from '@/purchase/domain/entity/entityInterfaceOrder';

@Entity({ name: 'products' })
export class ProductEntity implements product {
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

  @Column()
  name: string;

  @Column()
  status: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  category_product: string;

  @Column()
  gender: string;

  @Column()
  percentaje_discount: number;

  @Column({ nullable: true })
  franchise: string;

  @ManyToMany(() => OrderEntity, (item)=> item.products )
  OrderPurchase: OrderPurchase[];
}
