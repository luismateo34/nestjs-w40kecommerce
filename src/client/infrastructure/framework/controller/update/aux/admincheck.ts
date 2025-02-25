import { permissions } from 'src/client/infrastructure/framework/permission/permission';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//---
@Injectable()
export class admincheck {
  constructor(private readonly permin: permissions) {}
  async checkAdmin_Name_lastname(
    req: Request,
    name: string,
    lastname: string,
  ): Promise<void> {
    const adminAuth = await this.permin.adminAuth(req);
    if (adminAuth) {
      return;
    }
    const client = await this.permin.clientPayload(req);
    if (client.lastname !== lastname || client.name !== name) {
      throw new HttpException('not permited', HttpStatus.FORBIDDEN);
    }
  }
}
