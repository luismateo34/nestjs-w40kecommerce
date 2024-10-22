import {
  Column,
  Entity,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
} from 'typeorm';
import { product } from '@/product/domain/entity/entityInterfaceProduct';
import { OrderEntity } from '@/purchase/infrastructure/PurchaseOrderEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
}
@Injectable()
export class InjectProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private adminInject: Repository<ProductEntity>,
  ) {
    this.service = this.adminInject;
  }
  readonly service: Repository<ProductEntity>;
}
