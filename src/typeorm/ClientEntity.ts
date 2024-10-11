import { client } from '@/client/domain/entity/entityInterfaceClient';
import { Base } from '@/config/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './PurchaseOrderEntity';

@Entity({ name: 'client' })
export class ClienEntity extends Base implements client {
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
}
