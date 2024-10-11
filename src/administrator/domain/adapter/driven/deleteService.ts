import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '@/typeorm/adminEntity';
import { ForDeleteAdmin } from '../../port/driven/for-delete-admin';

@Injectable()
export class DeleteAdmin implements ForDeleteAdmin {
  constructor(
    @InjectRepository(AdminEntity)
    private admin: Repository<AdminEntity>,
  ) {}
  async deleteAdmin(name: string, lastname: string): Promise<void> {
    await this.admin.delete({ name: name, lastname: lastname });
  }
}
