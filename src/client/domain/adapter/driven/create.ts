import { createType } from '@/client/domain/port/driven/for-createClient-driven';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienEntity } from '@/typeorm/ClientEntity';
import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAndUpdateClient implements createType {
  constructor(
    @InjectRepository(ClienEntity)
    private client: Repository<ClienEntity>,
  ) {}
  async CreateClient(
    name: string,
    lastname: string,
    password: string,
    email: string,
  ): Promise<void> {
    const client = {
      email: email,
      name: name,
      lastname: lastname,
      password: await hash(password, 8),
    };
    await this.client.save(client);
  }
}
