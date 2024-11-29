import { Response, Request } from 'express';
import { clientJwt } from '@/client/application/type/clientJtw';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindMethod } from 'src/client/application/usecase/find';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
/**/
@Injectable()
export class ProductPurchaseMethod {
  constructor(
    @Inject('FindMethod') private service: FindMethod,
    private readonly perm: permissions,
  ) {}
  async productPurchase(
    name: string,
    lastname: string,
    req: Request,
    res: Response,
  ) {
    try {
      const adminAuth = await this.perm.adminAuth(req);
      let client: clientJwt;
      if (!adminAuth) {
        client = await this.perm.checkPermissions(req);
      }
      if (
        (!adminAuth && client.lastname !== lastname) ||
        client.name !== name
      ) {
        throw new HttpException('not permited', HttpStatus.FORBIDDEN);
      }
      /*----*/
      const resp = await this.service.Get_Client_Product_Purchase(
        name,
        lastname,
      );
      res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
