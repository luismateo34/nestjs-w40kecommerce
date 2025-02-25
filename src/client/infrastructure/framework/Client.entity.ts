import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { client } from 'src/client/domain/entity/entityInterfaceClient';
import { OrderEntity } from 'src/purchase/infrastructure/framework/PurchaseOrder.entity';

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

  @OneToMany(() => OrderEntity, (item) => item.id)
  @JoinColumn({ name: 'purchase_order' })
  purchase_order: OrderEntity[] | null;

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
