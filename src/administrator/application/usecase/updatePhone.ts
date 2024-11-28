import { Update as updateResponse } from 'src/administrator/application/usecase/response';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';
import { DrivenUpdate, Update } from 'src/administrator/domain/adapter/driving';

export class UpadatePhone {
  private method: Update;
  constructor(readonly service: adminOrm) {
    this.method = new Update(new DrivenUpdate(service));
  }
  async phone_update(
    lastname: string,
    name: string,
    phone: number,
  ): Promise<updateResponse> {
    await this.method.update_Phone(lastname, name, phone);
    return updateResponse.SUCCESS;
  }
}
