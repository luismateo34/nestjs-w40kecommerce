import { AdminByEmail } from 'src/administrator/application/usecase';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class Emailmethod {
  constructor(
    @Inject('adminByEmail') private readonly adminByEmail: AdminByEmail,
  ) {}
  async find_Email(email: string, res: Response) {
    if (email === undefined || email.length === 0) {
      throw new HttpException(
        'error: name is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const obj = await this.adminByEmail.ByEmail(email);
      return res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `error:${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(`error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
