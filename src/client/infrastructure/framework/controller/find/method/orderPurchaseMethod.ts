import { Response, Request } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindMethod } from 'src/client/application/usecase/find';
import { OrderAux } from './aux/orderAux';

@Injectable()
export class OrderpurchaseMethod {
  constructor(
    @Inject('FindMethod') private service: FindMethod,
    private orderAux: OrderAux,
  ) {}
  async orderPurchase(id: string, req: Request, res: Response) {
    try {
      await this.orderAux.orderAux(id, req);
      /*----*/
      const resp = await this.service.Get_Client_Order_Purchase(id);
      res.status(HttpStatus.OK).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
