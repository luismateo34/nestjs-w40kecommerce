import { Injectable } from '@nestjs/common';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { AdminSeed } from '../models/admin';
import { RootSeed } from '../models/rootAdmin';
import { DeleteService } from 'src/administrator/domain/adapter/driven';

@Injectable()
export class AdminSeeder implements Seeder {
  async drop(): Promise<void> {
    const { name, lastname } = new RootSeed();
    DeleteService.delete_Admin(name, lastname);
  }
  async seed(): Promise<void> {
    DataFactory.createForClass(AdminSeed).generate(5);
    DataFactory.createForClass(RootSeed).generate(1);
  }
}
