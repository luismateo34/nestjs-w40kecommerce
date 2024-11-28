import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { client } from '../domain/entity/entityInterfaceClient';
import { OrderEntity } from '../../purchase/infrastructure/PurchaseOrder.entity';

@Entity({ name: 'client' })
export class ClientEntity implements client {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => OrderEntity, (item) => item.client)
  @JoinColumn({ name: 'purchase_order' })
  purchase_order: string[];

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
}
