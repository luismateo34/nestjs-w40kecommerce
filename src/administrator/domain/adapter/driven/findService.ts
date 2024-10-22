import { ForFindAdmin } from '../../port/driven/for-find-admin';
import {
  AdminEntity,
  AdminInject,
} from '@/administrator/infrastructure/adminEntity';

class FindService implements ForFindAdmin {
  constructor(private service: AdminInject) {}
  async find_All() {
    return await this.service.admin.find();
  }
  async find_Name_Lastname(
    name: string,
    lastname: string,
  ): Promise<AdminEntity> {
    return await this.service.admin.findOneBy({
      name: name,
      lastname: lastname,
    });
  }

  async find_Email(email: string): Promise<AdminEntity> {
    return await this.service.admin.findOneBy({ email: email });
  }
  async find_Password(name: string, lastname: string): Promise<string> {
    const date = await this.service.admin.findOneBy({
      name: name,
      lastname: lastname,
    });
    return date.password;
  }
}

let inj: AdminInject;
export const Find = new FindService(inj);
