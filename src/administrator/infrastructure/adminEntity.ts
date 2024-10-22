import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
} from 'typeorm';
import {
  AdminInterface,
  permissions,
} from '@/administrator/domain/entity/entityAdminInterface';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

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
export class AdminInject {
  constructor(
    @InjectRepository(AdminEntity)
    private adminInject: Repository<AdminEntity>,
  ) {
    this.admin = this.adminInject;
  }
  readonly admin: Repository<AdminEntity>;
}

