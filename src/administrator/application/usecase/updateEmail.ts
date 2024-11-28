import { DrivenUpdate, Update } from 'src/administrator/domain/adapter/driving';
import { Update as updateResponse } from 'src/administrator/application/usecase/response';
import { adminOrm } from 'src/administrator/domain/entity/orm_method.interface';

export class UpadateEmail {
  private method: Update;
  constructor(readonly service: adminOrm) {
    this.method = new Update(new DrivenUpdate(service));
  }
  async EmailUpdate(
    email: string,
    lastname: string,
    name: string,
  ): Promise<updateResponse> {
    await this.method.update_Email(email, lastname, name);
    return updateResponse.SUCCESS;
  }
}
