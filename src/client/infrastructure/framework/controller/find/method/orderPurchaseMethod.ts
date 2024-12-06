import { Response, Request } from 'express';
import { clientJwt } from '@/client/application/type/clientJtw';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { FindMethod } from 'src/client/application/usecase/find';
/**/

@Injectable()
export class OrderpurchaseMethod {
  constructor(
    @Inject('FindMethod') private service: FindMethod,
    private readonly perm: permissions,
  ) {}
  async orderPurchase(id: string, req: Request, res: Response) {
    try {
      const adminAuth = await this.perm.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.perm.clientPayload(req);
      }
      if (!adminAuth && client.id !== id) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
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
