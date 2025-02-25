import { DrivenUpdate, Update } from 'src/administrator/domain/adapter/driving';
import { Update as updateResponse } from 'src/administrator/application/usecase/response';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class UpdatePassword {
  private method: Update;
  constructor(readonly service: adminOrm) {
    this.method = new Update(new DrivenUpdate(service));
  }
  async update_Pass(
    lastname: string,
    name: string,
    password: string,
  ): Promise<updateResponse> {
    await this.method.update_Password(lastname, name, password);
    return updateResponse.SUCCESS;
  }
}
