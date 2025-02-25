import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import type { Request } from 'express';
import { permissions } from 'src/client/infrastructure/framework/permission/permission';

@Injectable()
export class Admincheq {
  constructor(private readonly perm: permissions) {}
  async cheq(@Req() req: Request, name: string, lastname: string) {
    const Is_admin_Auth = await this.perm.adminAuth(req); // si es admin
    if (Is_admin_Auth) {
      return;
    }
    const resp = await this.perm.clientPayload(req); // return clientJwt
    if (resp.lastname === lastname && resp.name === name) {
      return;
    }
    throw new HttpException('not permited', HttpStatus.FORBIDDEN);
  }
}
