import { product } from 'src/product/domain/entity/entityInterfaceProduct';
import {
  Column,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
