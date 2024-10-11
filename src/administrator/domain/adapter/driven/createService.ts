import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '@/typeorm/adminEntity';
import { admin } from '@/administrator/domain/entity/entityAdminInterface';
import { ForCreateAdmin } from '../../port/driven/for-create-admin';

@Injectable()
export class CreateAndUpdate implements ForCreateAdmin {
  constructor(
    @InjectRepository(AdminEntity)
    private admin: Repository<AdminEntity>,
  ) {}
  private saltround: 8;
  async createAdmin(user: admin) {
    const saveUser = {} as admin;
    saveUser.email = user.email;
    saveUser.permissions = user.permissions;
    saveUser.name = user.name;
    saveUser.lastname = user.lastname;
    saveUser.phone = user.phone;
    saveUser.password = await hash(user.password, this.saltround);
    await this.admin.save(saveUser);
  }
}
