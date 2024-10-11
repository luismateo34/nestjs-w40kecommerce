import { deleteType } from '@/client/domain/port/driven/for-deleteClient-driven';
import { ClienEntity } from '@/typeorm/ClientEntity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteAndUpdateClient implements deleteType {
  constructor(
    @InjectRepository(ClienEntity)
    private client: Repository<ClienEntity>,
  ) {}
  async DeleteClient(name: string, lastname: string): Promise<void> {
    await this.client.delete({ name: name, lastname: lastname });
  }
}
