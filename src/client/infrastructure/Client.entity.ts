import { Base } from '../../config/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, Repository } from 'typeorm';
import { client } from '../domain/entity/entityInterfaceClient';
import { OrderEntity } from '../../purchase/infrastructure/PurchaseOrder.entity';

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
export class Client {
  constructor(
    @InjectRepository(ClientEntity)
    private adminInject: Repository<ClientEntity>,
  ) {
    this.admin = this.adminInject;
  }
  readonly admin: Repository<ClientEntity>;
}
let inj: Client;

class provider {
  constructor(readonly service: Client) {}
  readonly admin = this.service.admin;
}

export const InjectClient = new provider(inj);
