import { AdminEntity } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';
import { Repository } from 'typeorm';
import { permissions } from '../domain/entity/entityAdminInterface';
import { admin } from 'src/administrator/domain/entity/entityAdminInterface';

export class AdminDatabase implements adminOrm {
  constructor(
    @InjectRepository(AdminEntity)
    private service: Repository<AdminEntity>,
  ) {}
  async delete(name: string, lastname: string): Promise<void> {
    await this.service.delete({ name: name, lastname: lastname });
  }
  async findAll(): Promise<AdminEntity[]> {
    return await this.service.find();
  }
  async findOne(name: string, lastname: string): Promise<AdminEntity> {
    return await this.service.findOneBy({ name: name, lastname: lastname });
  }
  async findOne_Password(name: string, lastname: string): Promise<string> {
    const resp = await this.service.findOneBy({
      name: name,
      lastname: lastname,
    });
    const pass = resp.password;
    return pass;
  }
  async findOneBy_Email(email: string): Promise<AdminEntity> {
    return await this.service.findOneBy({ email: email });
  }
  async findOneBy_Name_Lastname(
    name: string,
    lastname: string,
  ): Promise<AdminEntity> {
    return await this.service.findOneBy({ name: name, lastname: lastname });
  }
  async update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void> {
    await this.service.update(
      { lastname: lastname, name: name },
      { permissions: permissions },
    );
  }
  async update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void> {
    await this.service.update(
      { lastname: lastname, name: name },
      { password: password },
    );
  }
  async update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<void> {
    await this.service.update(
      { lastname: lastname, name: name },
      { phone: phone },
    );
  }
  async update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<void> {
    await this.service.update(
      { lastname: lastname, name: name },
      { email: email },
    );
  }
  async save(user: admin): Promise<void> {
    await this.service.save(user);
  }
}
