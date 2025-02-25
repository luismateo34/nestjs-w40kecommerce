import { randomUUID } from 'node:crypto';
import { hashSync } from 'bcrypt';
import {
  admin,
  AdminInterface,
  permissions,
} from 'src/administrator/domain/entity/entityAdminInterface';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class ormMock implements adminOrm {
  public AdminObj: AdminInterface | null;
  //----
  async delete(name: string, lastname: string): Promise<void> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    this.AdminObj = null;
  }
  //----
  async update_Password(
    lastname: string,
    name: string,
    password: string,
  ): Promise<void> {
    const obj = {
      lastname,
      name,
      password: hashSync(password, 10),
    };
    this.AdminObj = { ...this.AdminObj, ...obj };
  }
  //-----
  async save(user: admin): Promise<void> {
    const autoObj = {
      id: randomUUID(),
      permision: permissions.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result: AdminInterface = { ...user, ...autoObj };
    this.AdminObj = result;
  }
  //-----
  async findOne_Password(name: string, lastname: string): Promise<string> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    return this.AdminObj.password;
  }
  //-----
  async update_Phone(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<void> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    this.AdminObj.phone = phone;
  }
  //-----
  async update_Email(
    email: string,
    lastname: string,
    name: string,
  ): Promise<void> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    this.AdminObj.email = email;
  }
  //-----
  async findAll(): Promise<AdminInterface[]> {
    return [this.AdminObj];
  }
  //-----
  async findOne(name: string, lastname: string): Promise<AdminInterface> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    return this.AdminObj;
  }
  //-----
  async findOneBy_Email(email: string): Promise<AdminInterface> {
    if (this.AdminObj.email === email) {
      return this.AdminObj;
    }
    if (this.AdminObj.email !== email) {
      throw new Error();
    }
  }
  //-----
  async findOneBy_Name_Lastname(
    name: string,
    lastname: string,
  ): Promise<AdminInterface> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    return this.AdminObj;
  }
  //-----
  async update_Permissions(
    lastname: string,
    name: string,
    permissions: permissions,
  ): Promise<void> {
    if (name !== this.AdminObj.name || lastname !== this.AdminObj.lastname) {
      throw new Error();
    }
    this.AdminObj.permissions = permissions;
  }
}
