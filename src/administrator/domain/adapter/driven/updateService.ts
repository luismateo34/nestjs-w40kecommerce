import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '@/typeorm/adminEntity';
import { permissions } from '@/administrator/domain/entity/entityAdminInterface';
import { ForUpdateAdmin } from '../../port/driven/for-update-admin';

@Injectable()
export class UpdateService implements ForUpdateAdmin {
  constructor(
    @InjectRepository(AdminEntity)
    private admin: Repository<AdminEntity>,
  ) {}
  async updateEmail(
    email: string,
    lastname: string,
    name: string,
  ): Promise<void> {
    await this.admin.update(
      { name: name, lastname: lastname },
      {
        email: email,
      },
    );
  }
  async updatePassword(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void> {
    const passwordHash = await hash(password, 8);
    await this.admin.update(
      { name: name, lastname: lastname },
      {
        password: passwordHash,
      },
    );
  }
  async updatePhone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<void> {
    await this.admin.update(
      { name: name, lastname: lastname },
      {
        phone: phone,
      },
    );
  }
  async updatePermissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void> {
    await this.admin.update(
      { name: name, lastname: lastname },
      {
        permissions: permissions,
      },
    );
  }
}
