import { Response, Request } from 'express';
import { clientJwt } from '@/client/application/type/clientJtw';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindMethod } from 'src/client/application/usecase/find';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';
/**/
@Injectable()
export class ClientAllDataMehtod {
  constructor(
    @Inject('FindMethod') private service: FindMethod,
    private readonly perm: permissions,
  ) {}
  async clientAllData(
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
      /*------*/
      const resp = await this.service.Get_Client(name, lastname);
      const obj = {
        name: resp.name,
        lastname: resp.lastname,
        email: resp.email,
        id: resp.id,
        createDate: resp.createdAt,
        order: resp.purchase_order,
      };
      res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(`error: ${e.message}`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
