import { FindAdmin, DrivenFind } from 'src/administrator/domain/adapter/driver';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class AllAdmin {
  private method: FindAdmin;
  constructor(readonly service: adminOrm) {
    this.method = new FindAdmin(new DrivenFind(service));
  }
  async All() {
    const userFind = await this.method.find_All();

    const arr = userFind.map((el) => {
      return {
        name: el.name,
        lastname: el.lastname,
        email: el.email,
        id: el.id,
        permission: el.permissions,
      };
    });
    return arr;
  }
}
