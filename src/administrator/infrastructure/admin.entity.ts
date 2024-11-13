import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  AdminInterface,
  permissions,
} from '../domain/entity/entityAdminInterface';

@Entity({ name: 'admin' })
export class AdminEntity implements AdminInterface {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  lastname: string;
  @Column()
  password: string;
  @Column()
  phone: number;
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createdAt!: Date;
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updatedAt!: Date;
  @Column({ type: 'enum', enum: permissions, default: permissions.ADMIN })
  permissions: permissions;
}

@Injectable()
export class Admin {
  constructor(
    @InjectRepository(AdminEntity)
    private adminInject: Repository<AdminEntity>,
  ) {
    this.admin = this.adminInject;
  }
  readonly admin: Repository<AdminEntity>;
}

let inj: Admin;

class provider {
  constructor(readonly service: Admin) {}
  readonly admin = this.service.admin;
}

export const AdminInject = new provider(inj);
