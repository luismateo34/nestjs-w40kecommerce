import { permissions } from '@/administrator/domain/entity/entityAdminInterface';
import { AdminEntity } from '@/typeorm/adminEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindPermision } from '../../port/driven/for-find-permision';

@Injectable()
export class FindPermisionbyName implements FindPermision {
  constructor(
    @InjectRepository(AdminEntity)
    private admin: Repository<AdminEntity>,
  ) {}
  async getPermision(name: string, lastname: string): Promise<permissions> {
    const adminData = await this.admin.findOne({
      where: { name: name, lastname: lastname },
    });
    return adminData.permissions;
  }
}
