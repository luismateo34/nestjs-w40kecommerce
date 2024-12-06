import { updateClientDriving } from 'src/client/domain/port/driving/for-update';
import { getclient } from 'src/client/domain/port/driven/for-getClient-driven';
import { updateType } from 'src/client/domain/port/driven/for-updateClient-driven';
import { UpdatePurchase } from 'src/client/domain/validation/validate';
import { validate } from 'class-validator';

export class Update implements updateClientDriving {
  constructor(
    private readonly method: updateType,
    private readonly getclient: getclient,
  ) {}
  async Update_Client_Email(
    name: string,
    lastname: string,
    email: string,
  ): Promise<'success'> {
    const find = await this.getclient.Get_Client(name, lastname);
    if (find.name === undefined) {
      throw new Error('error no se encontro el cliente');
    }
    await this.method.Update_Client_Email(name, lastname, email);
    return 'success';
  }
  async Update_Client_Name(name: string, lastname: string): Promise<'success'> {
    const find = await this.getclient.Get_Client(name, lastname);
    if (find.name === undefined) {
      throw new Error('error no se encontro el cliente');
    }
    await this.method.Update_Client_Name(name, lastname);
    return 'success';
  }
  async Update_Client_Password(
    name: string,
    lastname: string,
    password: string,
  ): Promise<'success'> {
    const find = await this.getclient.Get_Client(name, lastname);
    if (find.name === undefined) {
      throw new Error('error no se encontro el cliente');
    }
    await this.method.Update_Client_Password(name, lastname, password);
    return 'success';
  }
  async Update_Purchase_orders(id: string, order: string[]): Promise<void> {
    const dto = new UpdatePurchase();
    dto.id = id;
    dto.purchase_orders = order;
    const error = await validate(dto);
    if (error.length > 0) {
      throw new Error('datos no validos');
    }
    await this.method.Update_Purchase_orders(id, order);
  }
}
