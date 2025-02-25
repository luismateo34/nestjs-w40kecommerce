import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';

@Injectable()
export class OrderAux {
  constructor(private readonly perm: permissions) {}
  async orderAux(id: string, req: Request) {
    const adminAuth = await this.perm.adminAuth(req);
    if (adminAuth) {
      return;
    }
    const client = await this.perm.clientPayload(req);
    if (client.id !== id) {
      throw new HttpException('not permited', HttpStatus.FORBIDDEN);
    }
  }
}
