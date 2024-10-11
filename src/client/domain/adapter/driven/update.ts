import { ClienEntity } from '@/typeorm/ClientEntity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateType } from '@/client/domain/port/driven/for-updateClient-driven';
import { hash } from 'bcrypt';

@Injectable()
export class UpdateClient implements updateType {
  constructor(
    @InjectRepository(ClienEntity)
    private client: Repository<ClienEntity>,
  ) {}
  async UpdateClientEmail(
    name: string,
    lastname: string,
    email: string,
  ): Promise<void> {
    await this.client.update(
      { name: name, lastname: lastname },
      { email: email },
    );
  }
  async UpdateClientName(name: string, lastname: string): Promise<void> {
    await this.client.update(
      { name: name, lastname: lastname },
      { name: name, lastname: lastname },
    );
  }
  async UpdateClientPassword(
    name: string,
    lastname: string,
    password: string,
  ): Promise<void> {
    await this.client.update(
      { name: name, lastname: lastname },
      { password: await hash(password, 8) },
    );
  }
}
