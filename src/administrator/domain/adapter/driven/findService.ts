import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '@/typeorm/adminEntity';
import { ForFindAdmin } from '../../port/driven/for-find-admin';

@Injectable()
export class FindService implements ForFindAdmin {
  constructor(
    @InjectRepository(AdminEntity)
    private admin: Repository<AdminEntity>,
  ) {}
  async findAll() {
    return await this.admin.find();
  }
  async findByNameandLastname(
    name: string,
    lastname: string,
  ): Promise<AdminEntity> {
    return await this.admin.findOneBy({ name: name, lastname: lastname });
  }

  async findByEmail(email: string): Promise<AdminEntity> {
    return await this.admin.findOneBy({ email: email });
  }
  async findPassword(name: string, lastname: string): Promise<string> {
    const date = await this.admin.findOneBy({ name: name, lastname: lastname });
    return date.password;
  }
}
