import { AllAdmin } from '@/administrator/application/usecase';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class Allmethod {
  constructor(@Inject('AllAdmin') private readonly allAdmin: AllAdmin) {}

  async find_All(res: Response) {
    try {
      const obj = await this.allAdmin.All();
      return res.status(HttpStatus.OK).json(obj);
    } catch (e) {
      if (e instanceof Error && e.message.length !== 0) {
        throw new HttpException(
          `error:${e.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
