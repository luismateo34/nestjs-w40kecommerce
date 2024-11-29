import { Inject, Injectable } from '@nestjs/common';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { AdminSeed } from '../models/admin';
import { RootSeed } from '../models/rootAdmin';
import { singleclientSeed } from '../models/singleClient';
import { PurchaseSeed } from '../models/purchase';
import { cashSeeder } from '../models/cashflow';
import { clientSeed } from '../models/client';
import { Delete } from 'src/administrator/application/usecase/delete';

@Injectable()
export class AdminSeeder implements Seeder {
  constructor(@Inject('Delete') private readonly methodDelete: Delete) {}
  async drop(): Promise<void> {
    const { name, lastname } = new RootSeed();
    this.methodDelete.delete(name, lastname);
  }
  async seed(): Promise<void> {
    DataFactory.createForClass(AdminSeed).generate(5);
    DataFactory.createForClass(RootSeed).generate(1);
    DataFactory.createForClass(clientSeed).generate(5);
    DataFactory.createForClass(PurchaseSeed).generate(5);
    DataFactory.createForClass(singleclientSeed).generate(1);
    DataFactory.createForClass(cashSeeder).generate(1);
  }
}
