import {
  Column,
  Entity,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { product } from '@/product/domain/entity/entityInterfaceProduct';
import { OrderEntity } from './PurchaseOrderEntity';
import { Repleace } from './RepleaceEntity';

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
  // ordenes de compra donde aprarece el producto
  @ManyToMany(() => OrderEntity, (item) => item.products)
  @JoinTable({ name: 'order_product' })
  order_product: string[];

  @ManyToOne(() => Repleace, (item) => item.product)
  @JoinColumn({ name: 'name' })
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
}
