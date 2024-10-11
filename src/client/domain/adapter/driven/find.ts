import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienEntity } from '@/typeorm/ClientEntity';
import { Injectable } from '@nestjs/common';
import { getclient } from '@/client/domain/port/driven/for-getClient-driven';
import { client } from '../../entity/entityInterfaceClient';

@Injectable()
export class forGetClient implements getclient {
  constructor(
    @InjectRepository(ClienEntity)
    private client: Repository<ClienEntity>,
  ) {}

  async GetClient(name: string, lastname: string): Promise<client> {
    return await this.client.findOneBy({ name: name, lastname: lastname });
  }

  async GetClientOrderPurchase(
    name: string,
    lastname: string,
  ): Promise<string[]> {
    const res = await this.client.findOneBy({ name: name, lastname: lastname });
    const order = res.purchase_order;
    return order;
  }
  async GetClientPassword(name: string, lastname: string): Promise<string> {
    const resp = await this.client.findOneBy({
      name: name,
      lastname: lastname,
    });
    return resp.password;
  }
}
