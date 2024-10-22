import { client } from '@/client/domain/entity/entityInterfaceClient';
import { Base } from '@/config/base';
import { OrderEntity } from '@/purchase/infrastructure/PurchaseOrderEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, Repository } from 'typeorm';

@Entity({ name: 'client' })
export class ClientEntity extends Base implements client {
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
@Injectable()
export class InjectClient {
  constructor(
    @InjectRepository(ClientEntity)
    private adminInject: Repository<ClientEntity>,
  ) {
    this.admin = this.adminInject;
  }
  readonly admin: Repository<ClientEntity>;
}

